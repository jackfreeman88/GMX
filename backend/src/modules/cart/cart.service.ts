import { Brand } from './../../models/brand.model';
import { User } from './../../models/user.model';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { MailServiceService } from 'src/mail-service/mail-service.service';
import { Cart } from 'src/models/cart.model';
import { Category } from 'src/models/category.model';
import { Product } from 'src/models/product.model';
import { ProductQuote } from 'src/models/productQuote.model';
import { ProductQuoteItem } from 'src/models/productQuoteItem.model';
import { HelperService } from 'src/services/Helper.service';
import { JwtUserDTO } from '../auth/dto/JwtUser.dto';
const { FRONEND_BASE_URL } = process.env;
@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private cartModel: typeof Cart,
    @InjectModel(Product)
    private productModel: typeof Product,
    @InjectModel(ProductQuote)
    private productQuoteModel: typeof ProductQuote,
    @InjectModel(ProductQuoteItem)
    private productQuoteItemModel: typeof ProductQuoteItem,
    private mailService?: MailServiceService,
  ) { }

  async getCartItems(jwtUserDTO: JwtUserDTO) {
    const cartItems = await this.cartModel.findAll({
      include: [
        {
          model: Product,
          include: [{
            model: Category,
            attributes: ['title']
          }],
          attributes: [
            'id',
            'title',
            'harvested',
            'brandId'
          ],
        },
      ],
      where: {
        retailerId: jwtUserDTO.id
      },
      attributes: [
        'id',
        'quantity'
      ],
    })

    const cartData: any = await this.cartModel.findAll({
      attributes: [
        'brandId',
        [Sequelize.fn('sum', Sequelize.col('quantity')), 'totalItems'],
      ],
      where: {
        retailerId: jwtUserDTO.id
      },
      group: ['brandId'],
      raw: true
    });
    const brandId = cartData.length && cartData[0].brandId ? cartData[0].brandId : '';
    const totalItems = cartData.length && cartData[0].totalItems ? cartData[0].totalItems : 0;
    
    return { brandId: brandId, totalItems: totalItems, cartItems };
  }

  async addItem(jwtUserDTO: JwtUserDTO, productSlug: string, quantity: number) {
    const product = await this.productModel.findOne({
      where: {slug: productSlug}
    })
    if (!product) throw new NotFoundException('Product Not Found');
    const existingItemsFromSameBrandInCart = await this.cartModel.findAll({
      where: {
        retailerId: jwtUserDTO.id,
        brandId: product.brandId
      }
    });
    if (existingItemsFromSameBrandInCart && existingItemsFromSameBrandInCart.length) {
      const existingItemInCart = await this.cartModel.findOne({
        where: {
          retailerId: jwtUserDTO.id,
          brandId: product.brandId,
          productId: product.id
        }
      });
      if (existingItemInCart) {
        let updatedQuantity;
        if (existingItemInCart.quantity === 99999) {
          throw new ForbiddenException('You have added maximum number of quantity of product, can not add more quantity now')
        } else if ((existingItemInCart.quantity + quantity) > 99999) {
          updatedQuantity = 99999
        } else {
          updatedQuantity = existingItemInCart.quantity + quantity
        }
        await existingItemInCart.update({
          quantity: updatedQuantity
        })
        // return { product: { ...existingItemInCart.toJSON() } }
      } else {
        const item = await this.cartModel.create({
          retailerId: jwtUserDTO.id,
          brandId: product.brandId,
          productId: product.id,
          quantity
        });
        // return { product: { ...item.toJSON() } }
      }
    } else {
      const existingItemFromDifferentBrandInCart = await this.cartModel.findAll({
        where: {
          retailerId: jwtUserDTO.id
        }
      });
      if (existingItemFromDifferentBrandInCart && existingItemFromDifferentBrandInCart.length) {
        await this.cartModel.destroy({
          where: {
            retailerId: jwtUserDTO.id
          }
        });
      }
      const item = await this.cartModel.create({
        retailerId: jwtUserDTO.id,
        brandId: product.brandId,
        productId: product.id,
        quantity
      });
    }
    return this.getCartItems(jwtUserDTO);
  }

  async removeItem(jwtUserDTO: JwtUserDTO, cartId: number) {
    const item = await this.cartModel.findOne({
      where: {
        id: cartId,
        retailerId: jwtUserDTO.id
      }
    })
    if (!item) throw new NotFoundException();
    await item.destroy();
    return this.getCartItems(jwtUserDTO);
  }

  async requestQuote(jwtUserDTO: JwtUserDTO) {
    const helperService = new HelperService();
    let quoteDetails = `<div style="font-family: Arial, sans-serif, 'Open Sans';margin: 0 auto;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;">
                              <h2 style="font-family: Arial, sans-serif, 'Open Sans';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;">You have received a Quote for below product</h2>
                              </div>
                              <table style="margin : 0 auto;padding-top:10px">
                            <thead>
                            <tr>
                              <th style="width:200px;text-align: left">Product Name</th>
                              <th>Quantity</th>
                            </tr>
                          </thead>`
    const cartItems = await this.cartModel.findAll({
      where: {
        retailerId: jwtUserDTO.id
      }
    });
    if(!cartItems.length) throw new NotFoundException('No items found in cart');
    const TotalcartItems = await this.cartModel.findOne({
      attributes: [
          [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total_quantity'],
        ],
      where: {
        retailerId: jwtUserDTO.id
      }
    });
    const productQuote = await this.productQuoteModel.create({
      retailerId: jwtUserDTO.id,
      brandId: cartItems[0].brandId,
      status: 1
    })

    for await (const item of cartItems) {
    //cartItems.forEach(async (item) => {
      let createdItem = await this.productQuoteItemModel.create({
        productQuoteId: productQuote.id,
        productId: item.productId,
        quantity: item.quantity,
      })
      let QuoteRequest = await this.productQuoteItemModel.findOne({
        where: { id: createdItem.id },
        include: [
          {
            model: this.productModel,
          },
          {
            model: this.productQuoteModel,
            include: [{ model: User }]
          }
        ]
      })
      quoteDetails += `<tbody>
                            <tr>
                              <td>
                                <p>${QuoteRequest.product.title}</p>
                              </td>
                                <td>
                                <p>QTY:${QuoteRequest.quantity}</p>
                              </td>
                            </tr>
                          </tbody>`
      item.destroy();
    }
    await productQuote.update({ quoteId: 'QT' + String(productQuote.id).padStart(8, '0'), totalQuantity: TotalcartItems.toJSON().total_quantity });

    const brand = await Brand.findOne({
      where: { id: cartItems[0].brandId },
      include: [{ model: User }]
    })
    // const retailer = await User.findOne({
    //   where: { id: jwtUserDTO.id },
    //   attributes: ['businessName']
    // })
    quoteDetails += `</table>
    <div style="margin-top: 35px">
          <a
          target="_blank"
          rel="noopener noreferrer"
          href="${FRONEND_BASE_URL + `/quote-requests/QT${String(productQuote.id).padStart(8, '0')}`}"
          style="text-decoration: none"
          >
          <div style="border-left-color: transparent; border-top-width: 0; box-sizing: border-box; height: 0; margin: 0; width: 80%"></div>
          <div style="height: 16px; margin: 0; text-align: center">
            <span
              style="
                color: #fff;
                font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
                font-size: 14px !important;
                letter-spacing: 1px;
                line-height: 1em;
                margin: 0;
                text-transform: uppercase;
                background: #22a612;
                padding: 12px 14px;
                color: #fff;
                font-weight: bold;
              "
              >REQUESTED QUOTES
            </span>
          </div>
          <div style="border-bottom-width: 0; border-right-color: transparent; box-sizing: border-box; height: 0; margin: 0; width: 80%"></div>
        </a>
        </div>`
    const requestForPrice = {
      'TITLE': 'Quote Request',
      'QUOTE_DETAILS': quoteDetails
    };
    // console.log('quoteDetails--from cart---->', quoteDetails);
    const retailerEmailContent = await helperService.emailTemplateContent(22, requestForPrice)
    this.mailService.sendMail(brand.user.email, `Quote request for QT${String(productQuote.id).padStart(8, '0')}`, retailerEmailContent.body);
    return true;
  }

  async updateItemQuantity(jwtUserDTO: JwtUserDTO, action: string, cartId: number, quantity: number) {
    const existCart = await this.cartModel.findOne({
      where: {
        id: cartId
      }
    });
    if (!existCart) throw new NotFoundException();
    let updatedQuantity;
    if ((action === 'decrement' && existCart.quantity > 1) || (action === 'increment' && existCart.quantity < 99999) || (action === 'manual' && existCart.quantity <= 99999)) {
      if (action === 'manual') {
        updatedQuantity = quantity
      } else {
        updatedQuantity = existCart.quantity + quantity
      }
      await existCart.update({
        quantity: updatedQuantity
      });
    }
    return ({ action, cartId, quantity: existCart.quantity });
  }
}
