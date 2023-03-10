import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { Cart } from 'src/models/cart.model';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Product } from 'src/models/product.model';
import { ProductQuote } from 'src/models/productQuote.model';
import { ProductQuoteItem } from 'src/models/productQuoteItem.model';
import { MailServiceService } from 'src/mail-service/mail-service.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Cart, Product, ProductQuote, ProductQuoteItem
    ])
  ],
  controllers: [CartController],
  providers: [CartService, MailServiceService]
})
export class CartModule {}
