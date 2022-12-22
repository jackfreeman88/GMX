-- phpMyAdmin SQL Dump
-- version 4.9.10
-- https://www.phpmyadmin.net/
--
-- Host: gmx.cwj5akmjnuxp.us-east-2.rds.amazonaws.com:3306
-- Generation Time: Dec 22, 2022 at 09:59 AM
-- Server version: 8.0.28
-- PHP Version: 7.4.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gmx`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rememberToken` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT '1 for active, 2 for inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `rememberToken`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, ' ', 'cstraka@greenmarketexchange.com', '$2y$10$tGmL3JkjAz0I/QJDs7ad1.KPBpCWoDCaECyEJLh/X6V4RX6hrn6va', '', '1', '2021-06-17 13:00:00', '2022-10-26 19:47:28', NULL),
(2, ' ', 'admin@example.com', '$2a$10$3XCTrWFb2UBBeCFsJGZehOJ7Mvr7SdIRfbfCdslfYS2BSReg3/U26', 'dR1ia2D2XAH5M8rrabpZy384y9rc6GCSMNT7zMKzVfstkZPfesAJjUP3K5Pj', '1', '2021-06-17 13:00:00', '2022-11-18 13:43:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `attachments`
--

CREATE TABLE `attachments` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `attachableId` int DEFAULT NULL,
  `attachableType` varchar(255) DEFAULT NULL COMMENT 'post,comment,commentReply',
  `attachmentType` enum('1','2') DEFAULT '1' COMMENT '1 for image, 2 for video',
  `attachment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `axis_point`
--

CREATE TABLE `axis_point` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `file` blob,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `id` int NOT NULL,
  `preTitle` varchar(299) NOT NULL,
  `title` varchar(299) NOT NULL,
  `description` varchar(299) NOT NULL,
  `buttonText` varchar(299) NOT NULL,
  `buttonLink` varchar(299) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`id`, `preTitle`, `title`, `description`, `buttonText`, `buttonLink`, `image`, `isActive`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Green Market Exchange', 'The Future of Cannabis Commerce', 'usce eros nulla euismod elementum ante vulputate venenatis ipsum suspendisse vestibulum.', 'Read More', '', '/cms/1653886861-banner-slide1.jpg', 1, '2022-05-30 04:48:50', '2022-07-22 20:59:14', '2022-07-22 20:59:14'),
(2, 'Grow Your Stock', 'Green Market Exchange', 'The Future of Cannabis Trading', 'Read More', 'https://www.greenmarketexchange.com/about-us', '/cms/1653886724-banner-slide1.jpg', 1, '2022-05-30 04:48:50', '2022-08-31 12:13:37', '2022-08-31 12:13:37'),
(3, 'Curabi est felis', 'Duis Mis Sien Digni', 'usce eros nulla euismod elementum ante vulputate venenatis ipsum suspendisse vestibulum.', 'Read More', '', '/cms/1658136550-stock-original-4k.jpg', 1, '2022-07-18 09:29:10', '2022-07-18 09:29:29', '2022-07-18 09:29:29'),
(4, '', 'Green Market Exchange', 'Wholesale Marketplace', 'Get Started', 'https://www.greenmarketexchange.com/sign-up', '/cms/1661947984-1653886724-banner-slide1.jpg', 1, '2022-08-31 12:13:04', '2022-12-07 16:38:06', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `brand_details`
--

CREATE TABLE `brand_details` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `userId` int DEFAULT NULL,
  `brandName` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `avgOrder` float(10,2) DEFAULT '0.00',
  `address` varchar(255) DEFAULT NULL,
  `description` text,
  `avgProductRating` float(10,2) DEFAULT '0.00',
  `reviewsProductCount` int DEFAULT '0',
  `avgDOTRating` float(10,2) DEFAULT '0.00',
  `reviewsDOTCount` int DEFAULT '0',
  `avgGeneralRating` float(10,2) DEFAULT '0.00',
  `reviewsGeneralCount` varchar(255) DEFAULT '0',
  `avgRating` float(10,2) DEFAULT '0.00',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brand_details`
--

INSERT INTO `brand_details` (`isActive`, `id`, `userId`, `brandName`, `slug`, `website`, `year`, `avgOrder`, `address`, `description`, `avgProductRating`, `reviewsProductCount`, `avgDOTRating`, `reviewsDOTCount`, `avgGeneralRating`, `reviewsGeneralCount`, `avgRating`, `createdAt`, `updatedAt`) VALUES
(1, 1, 8, 'GMX', 'gmx', NULL, NULL, NULL, '112 North Shore Drive, Owls Head, ME, USA', 'Test', 0.00, 0, 0.00, 0, 0.00, '0', 0.00, '2022-12-20 00:54:23', '2022-12-20 00:54:23'),
(1, 2, 12, 'Top BuilderA', 'top-buildera', NULL, NULL, NULL, 'NYU Langone Health, 1st Avenue, New York, NY, USA', 'sd', 0.00, 0, 0.00, 0, 0.00, '0', 0.00, '2022-12-20 07:55:55', '2022-12-20 07:55:55'),
(1, 3, 13, 'Test 2', 'test-2', NULL, NULL, NULL, '95 lincoln street', 'test', 0.00, 0, 0.00, 0, 0.00, '0', 0.00, '2022-12-21 02:53:45', '2022-12-21 02:53:45');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `retailerId` int DEFAULT NULL,
  `brandId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`isActive`, `id`, `title`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'Badder/Butter', '2022-05-04 00:00:00', '2022-10-18 00:31:36', NULL),
(1, 2, 'Crumble', '2022-05-10 00:00:00', '2022-11-22 10:58:35', '2022-11-22 10:58:35'),
(1, 3, 'Crystalline', '2022-05-10 14:19:48', '2022-10-18 00:34:54', NULL),
(1, 4, 'Crystalline', '2022-06-02 09:45:51', '2022-11-22 10:57:54', '2022-11-22 10:57:54'),
(1, 5, 'Distillate', '2022-10-18 00:26:23', '2022-10-18 00:34:59', '2022-10-18 00:34:59'),
(1, 6, 'Edible', '2022-10-18 00:26:50', '2022-10-18 00:35:02', '2022-10-18 00:35:02'),
(1, 7, 'Dry Sift', '2022-10-18 00:27:06', '2022-10-18 00:35:05', '2022-10-18 00:35:05'),
(1, 8, 'Bubble Hash', '2022-10-18 00:27:27', '2022-10-18 00:27:27', NULL),
(1, 9, 'Crystalline', '2022-10-18 00:27:39', '2022-10-18 00:35:22', '2022-10-18 00:35:22'),
(1, 10, 'Sauce', '2022-10-18 00:27:53', '2022-10-18 00:35:25', '2022-10-18 00:35:25'),
(1, 11, 'Shatter', '2022-10-18 00:28:03', '2022-10-18 00:35:29', '2022-10-18 00:35:29'),
(1, 12, 'Crumble', '2022-10-18 00:35:43', '2022-10-18 00:35:43', NULL),
(1, 13, 'Crystalline', '2022-10-18 00:35:54', '2022-11-22 10:58:13', '2022-11-22 10:58:13'),
(1, 14, 'Distillate', '2022-10-18 00:36:17', '2022-10-18 00:36:17', NULL),
(1, 15, 'Dry Sift', '2022-10-18 00:36:35', '2022-10-18 00:36:35', NULL),
(1, 16, 'Edible', '2022-10-18 00:36:47', '2022-10-18 00:36:47', NULL),
(1, 17, 'Flower', '2022-10-18 00:36:59', '2022-10-18 00:36:59', NULL),
(1, 18, 'Pre Roll', '2022-10-18 00:37:09', '2022-10-18 00:37:09', NULL),
(1, 19, 'Sauce', '2022-10-18 00:37:31', '2022-10-18 00:37:31', NULL),
(1, 20, 'Shatter', '2022-10-18 00:37:39', '2022-10-18 00:37:39', NULL),
(1, 21, 'Tincture', '2022-10-26 21:51:03', '2022-10-26 21:51:03', NULL),
(1, 22, 'CBD', '2022-11-10 01:00:17', '2022-11-10 01:00:33', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cms`
--

CREATE TABLE `cms` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `content` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cms`
--

INSERT INTO `cms` (`isActive`, `id`, `name`, `slug`, `content`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'Home', 'home', '{\"banner_content\":[{\"preTitle\":\"\",\"title\":\"Green Market Exchange\",\"description\":\"Wholesale Marketplace\",\"buttonText\":\"Get Started\",\"buttonLink\":\"https:\\/\\/www.greenmarketexchange.com\\/sign-up\",\"image\":\"\\/cms\\/1661947984-1653886724-banner-slide1.jpg\"}],\"section2_count\":\"01\",\"section2_main_title\":\"Our vision\",\"section2_description\":\"<p>Green Market Exchange strives&nbsp;to be the industry leader in cannabis wholesale marketplace technology and innovation as we invision cannabis will be a globaly traded&nbsp;commodity in the near future.<\\/p>\",\"section2_button_title\":\"About Us\",\"section2_button_link\":\"https:\\/\\/www.greenmarketexchange.com\\/about-us\",\"section2_image\":\"\\/cms\\/1653902872-vision-img.jpg\",\"section3_count\":\"\",\"section3_main_title\":\"For Brands\",\"section3_list_icon1\":\"icon-cap\",\"section3_list_title1\":\"Grow your Brand\",\"section3_list_description1\":\"Create brand awareness, Showcase your business credibility, Differentiate your brand\",\"section3_list_icon2\":\"icon-listing\",\"section3_list_title2\":\"Increase Sale orders\",\"section3_list_description2\":\"Receive and Accept orders, Build new partnerships, Manage sales operations\",\"section3_button_title\":\"Sign Up\",\"section3_button_link\":\"https:\\/\\/www.greenmarketexchange.com\\/seller\\/sign-up\",\"section3_image\":\"\\/cms\\/1657531043-brand-img.jpg\",\"section4_count\":\"\",\"section4_main_title\":\"For Retailers\",\"section4_description\":\"\",\"section4_list_icon1\":\"icon color-f3772c\",\"section4_list_title1\":\"Discover credible and quality wholesalers\",\"section4_list_description1\":\"\",\"section4_list_icon2\":\"icon color-f3772c\",\"section4_list_title2\":\"Manifest new partnerships and improve old ones\",\"section4_list_description2\":\"\",\"section4_list_icon3\":\"icon color-f3772c\",\"section4_list_title3\":\"Diversify product offerings\",\"section4_list_description3\":\"\",\"section4_button_title\":\"Sign Up\",\"section4_button_link\":\"https:\\/\\/www.greenmarketexchange.com\\/sign-up\",\"section4_image\":\"\\/cms\\/1653902950-retailer-img1.png\",\"section4_small_image\":\"\\/cms\\/1653904493-retailer-img2.png\",\"meta_title\":\"The Future of Cannabis Commerce\",\"meta_keyword\":\"Green Market Exchange The Future of Cannabis Commerce\",\"meta_description\":\"Green Market Exchange The Future of Cannabis Commerce\"}', '2022-04-14 04:02:23', '2022-12-07 17:04:38', NULL),
(1, 2, 'Terms Of Use', 'terms-of-use', '{\"main_title\":\"Terms Of Use\",\"main_content\":\"<h6>Acceptance of the Terms of Use<\\/h6>\\r\\n\\r\\n<p>These terms of use are entered into by and between You and Green Market Exchange, Inc. (&quot;<strong>Company<\\/strong>,&quot; &quot;<strong>we<\\/strong>,&quot; or &quot;<strong>us<\\/strong>&quot;). The following terms and conditions, (&quot;<strong>Terms of Use<\\/strong>&quot;), govern your access to and use of <a href=\\\"https:\\/\\/www.greenmarketexchange.com\\\" target=\\\"_blank\\\">https:\\/\\/www.greenmarketexchange.com<\\/a>, including any content, functionality, and services offered on or through <a href=\\\"https:\\/\\/www.greenmarketexchange.com\\\" target=\\\"_blank\\\">https:\\/\\/www.greenmarketexchange.com<\\/a> (the &quot;<strong>Website<\\/strong>&quot;). If You are accessing or otherwise using this Website on behalf of a company or entity, You hereby represent and warrant that You have the authority to bind such Company to these Terms of Use, and that such company or entity hereby accepts the same.&nbsp;<\\/p>\\r\\n\\r\\n<p>Please read the Terms of Use carefully before you start to use the Website. By using the Website, you accept and agree to be bound and abide by these Terms of Use and our Privacy Policy, found at <a href=\\\"https:\\/\\/www.greenmarketexchange.com\\/privacy-policy\\\" target=\\\"_blank\\\">https:\\/\\/www.greenmarketexchange.com\\/privacy-policy<\\/a>, incorporated herein by reference. If you do not want to agree to these Terms of Use or the Privacy Policy, you must not access or use the Website.<\\/p>\\r\\n\\r\\n<p>This Website is offered and available to users who 21 years of age or older within the United States or any of its territories or possessions. By using this Website, you represent and warrant that you meet all of the foregoing eligibility requirements. If you do not meet all of these requirements, you must not access or use the Website.<\\/p>\\r\\n\\r\\n<h6>Changes to the Terms of Use<\\/h6>\\r\\n\\r\\n<p>We may revise and update these Terms of Use from time to time in our sole discretion. All changes are effective immediately when we post them. However, any changes to the dispute resolution provisions set out in Governing Law and Jurisdiction will not apply to any disputes for which the parties have actual notice before the date the change is posted on the Website. Your continued use of the Website following the posting of revised Terms of Use means that you accept and agree to the changes. You are expected to check this page from time to time so you are aware of any changes, as they are binding on you.<\\/p>\\r\\n\\r\\n<h6>Accessing the Website and Account Security<\\/h6>\\r\\n\\r\\n<p>We reserve the right to withdraw or amend this Website, and any service or material we provide on the Website, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Website is unavailable at any time or for any period. From time to time, we may restrict access to some parts of the Website, or the entire Website, to users, including registered users.<\\/p>\\r\\n\\r\\n<p>You are responsible for both:<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>Making all arrangements necessary for you to have access to the Website.<\\/li>\\r\\n  <li>Ensuring that all persons who access the Website through your internet connection are aware of these Terms of Use and comply with them.<\\/li>\\r\\n<\\/ul>\\r\\n<p><\\/p>\\r\\n<p>To access the Website or some of the resources it offers, you may be asked to provide certain registration details or other information. It is a condition of your use of the Website that all the information you provide on the Website is correct, current, and complete. You agree that all information you provide to register with this Website or otherwise, including, but not limited to, through the use of any interactive features on the Website, is governed by our Privacy Policy and you consent to all actions we take with respect to your information consistent with our Privacy Policy.<\\/p>\\r\\n\\r\\n<p>If you choose, or are provided with, a user name, password, or any other piece of information as part of our security procedures, you must treat such information as confidential, and you must not disclose it to any other person or entity. You also acknowledge that your account is personal to you and agree not to provide any other person with access to this Website or portions of it using your user name, password, or other security information. You agree to notify us immediately of any unauthorized access to or use of your user name or password or any other breach of security. You also agree to ensure that you exit from your account at the end of each session. You should use particular caution when accessing your account from a public or shared computer so that others are not able to view or record your password or other personal information.<\\/p>\\r\\n\\r\\n<p>We have the right to disable any user name, password, or other identifier, whether chosen by you or provided by us, at any time in our sole discretion for any or no reason, including if, in our opinion, you have violated any provision of these Terms of Use.<\\/p>\\r\\n\\r\\n<h6>Intellectual Property Rights<\\/h6>\\r\\n<p>The Website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by the Company, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.<\\/p>\\r\\n\\r\\n<p>These Terms of Use permit you to use the Website for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Website, except as follows:<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.<\\/li>\\r\\n  <li>You may store files that are automatically cached by your Web browser for display enhancement purposes.<\\/li>\\r\\n  <li>You may print or download one copy of a reasonable number of pages of the Website for your own personal, non-commercial use and not for further reproduction, publication, or distribution.<\\/li>\\r\\n  <li>If we provide desktop, mobile, or other applications for download, you may download a single copy to your computer or mobile device solely for your own personal, non-commercial use, provided you agree to be bound by our end user license agreement for such applications.<\\/li>\\r\\n  <li>If we provide social media features with certain content, you may take such actions as are enabled by such features.<\\/li>\\r\\n<\\/ul>\\r\\n\\r\\n<p><\\/p>\\r\\n<p>You must not:<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>Modify copies of any materials from this site.<\\/li>\\r\\n  <li>Use any illustrations, photographs, video or audio sequences, or any graphics separately from the accompanying text.<\\/li>\\r\\n  <li>Delete or alter any copyright, trademark, or other proprietary rights notices from copies of materials from this site.<\\/li>\\r\\n<\\/ul>\\r\\n<p><\\/p>\\r\\n<p>You must not access or use for any commercial purposes any part of the Website or any services or materials available through the Website.&nbsp;<br \\/>\\r\\nIf you print, copy, modify, download, or otherwise use or provide any other person with access to any part of the Website in breach of the Terms of Use, your right to use the Website will stop immediately and you must, at our option, return or destroy any copies of the materials you have made. No right, title, or interest in or to the Website or any content on the Website is transferred to you, and all rights not expressly granted are reserved by the Company. Any use of the Website not expressly permitted by these Terms of Use is a breach of these Terms of Use and may violate copyright, trademark, and other laws.<\\/p>\\r\\n\\r\\n<h6>Trademarks<\\/h6>\\r\\n\\r\\n<p>The Company name, the terms &ldquo;Green Market Exchange&rdquo;, &ldquo;GMX&rdquo;, all Company logos, and all related names, logos, product and service names, designs, and slogans are trademarks of the Company or its affiliates or licensors. You must not use such marks without the prior written permission of the Company. All other names, logos, product and service names, designs, and slogans on this Website are the trademarks of their respective owners.<\\/p>\\r\\n\\r\\n<h6>Prohibited Uses<\\/h6>\\r\\n\\r\\n<p>You may use the Website only for lawful purposes and in accordance with these Terms of Use. You agree not to use the Website:<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>In any way that violates any applicable federal, state, local, or international law or regulation (including, without limitation, any laws regarding the export of data or software to and from the US or other countries).&nbsp;<\\/li>\\r\\n  <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content, asking for personally identifiable information, or otherwise.<\\/li>\\r\\n  <li>To send, knowingly receive, upload, download, use, or re-use any material that does not comply with the content standards set out in these Terms of Use or elsewhere on this Website.<\\/li>\\r\\n  <li>To transmit, or procure the sending of, any advertising or promotional material, including any &quot;junk mail,&quot; &quot;chain letter,&quot; &quot;spam,&quot; or any other similar solicitation.<\\/li>\\r\\n  <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity (including, without limitation, by using email addresses or screen names associated with any of the foregoing).<\\/li>\\r\\n  <li>To engage in any other conduct that restricts or inhibits anyone&#39;s use or enjoyment of the Website, or which, as determined by us, may harm the Company or users of the Website, or expose them to liability.<\\/li>\\r\\n<\\/ul>\\r\\n\\r\\n<p><\\/p>\\r\\n<p>Additionally, you agree not to:<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>Use the Website in any manner that could disable, overburden, damage, or impair the site or interfere with any other party&#39;s use of the Website, including their ability to engage in real time activities through the Website.<\\/li>\\r\\n  <li>Use any robot, spider, or other automatic device, process, or means to access the Website for any purpose, including monitoring or copying any of the material on the Website.<\\/li>\\r\\n  <li>Use any manual process to monitor or copy any of the material on the Website, or for any other purpose not expressly authorized in these Terms of Use, without our prior written consent.<\\/li>\\r\\n  <li>Use any device, software, or routine that interferes with the proper working of the Website.<\\/li>\\r\\n  <li>Introduce any viruses, Trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful.<\\/li>\\r\\n  <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Website, the server on which the Website is stored, or any server, computer, or database connected to the Website.&nbsp;<\\/li>\\r\\n  <li>Attack the Website via a denial-of-service attack or a distributed denial-of-service attack.<\\/li>\\r\\n  <li>Otherwise attempt to interfere with the proper working of the Website.<\\/li>\\r\\n<\\/ul>\\r\\n\\r\\n<p><\\/p>\\r\\n<h6>User Contributions<\\/h6>\\r\\n\\r\\n<p>The Website may contain message boards, chat rooms, personal web pages or profiles, forums, bulletin boards, and other interactive features (collectively, &quot;Interactive Services&quot;) that allow users to post, submit, publish, display, or transmit to other users or other persons (hereinafter, &quot;post&quot;) content or materials (collectively, &quot;User Contributions&quot;) on or through the Website. All User Contributions must comply with the Content Standards set out in these Terms of Use.<\\/p>\\r\\n\\r\\n<p>Any User Contribution you post to the site will be considered non-confidential and non-proprietary. By providing any User Contribution on the Website, you grant us and our affiliates and service providers, and each of their respective licensees, successors, and assigns the right to use, reproduce, modify, perform, display, distribute, and otherwise disclose to third parties any such material for any purpose.&nbsp;<\\/p>\\r\\n\\r\\n<p>You represent and warrant that:&nbsp;<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>You own or control all rights in and to the User Contributions and have the right to grant the license granted above to us and our affiliates and service providers, and each of their respective licensees, successors, and assigns.<\\/li>\\r\\n  <li>All of your User Contributions do and will comply with these Terms of Use.<\\/li>\\r\\n<\\/ul>\\r\\n\\r\\n<p><\\/p>\\r\\n<p>You understand and acknowledge that you are responsible for any User Contributions you submit or contribute, and you, not the Company, have full responsibility for such content, including its legality, reliability, accuracy, and appropriateness.<\\/p>\\r\\n\\r\\n<p>We are not responsible or liable to any third party for the content or accuracy of any User Contributions posted by you or any other user of the Website.&nbsp;<\\/p>\\r\\n\\r\\n<h6>Monitoring and Enforcement Termination<\\/h6>\\r\\n\\r\\n<p>We have the right to:<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>Remove or refuse to post any User Contributions for any or no reason in our sole discretion.<\\/li>\\r\\n  <li>Take any action with respect to any User Contribution that we deem necessary or appropriate in our sole discretion, including if we believe that such User Contribution violates the Terms of Use, including the Content Standards, infringes any intellectual property right or other right of any person or entity, threatens the personal safety of users of the Website or the public, or could create liability for the Company.<\\/li>\\r\\n  <li>Disclose your identity or other information about you to any third party who claims that material posted by you violates their rights, including their intellectual property rights or their right to privacy.<\\/li>\\r\\n  <li>Take appropriate legal action, including without limitation, referral to law enforcement, for any illegal or unauthorized use of the Website.<\\/li>\\r\\n  <li>Terminate or suspend your access to all or part of the Website for any or no reason, including without limitation, any violation of these Terms of Use.<\\/li>\\r\\n<\\/ul>\\r\\n\\r\\n<p><\\/p>\\r\\n<p>Without limiting the foregoing, we have the right to cooperate fully with any law enforcement authorities or court order requesting or directing us to disclose the identity or other information of anyone posting any materials on or through the Website. YOU WAIVE AND HOLD HARMLESS THE COMPANY AND ITS AFFILIATES, LICENSEES, AND SERVICE PROVIDERS FROM ANY CLAIMS RESULTING FROM ANY ACTION TAKEN BY ANY OF THE FOREGOING PARTIES DURING, OR TAKEN AS A CONSEQUENCE OF, INVESTIGATIONS BY EITHER SUCH PARTIES OR LAW ENFORCEMENT AUTHORITIES.<\\/p>\\r\\n\\r\\n<p>However, we do not undertake to review material before it is posted on the Website, and cannot ensure prompt removal of objectionable material after it has been posted. Accordingly, we assume no liability for any action or inaction regarding transmissions, communications, or content provided by any user or third party. We have no liability or responsibility to anyone for performance or nonperformance of the activities described in this section.<\\/p>\\r\\n\\r\\n<h6>Content Standards<\\/h6>\\r\\n\\r\\n<p>These content standards apply to any and all User Contributions and use of Interactive Services. User Contributions must in their entirety comply with all applicable federal, state, local, and international laws and regulations. Without limiting the foregoing, User Contributions must not:<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>Contain any material that is defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, inflammatory, or otherwise objectionable.<\\/li>\\r\\n  <li>Promote sexually explicit or pornographic material, violence, or discrimination based on race, sex, religion, nationality, disability, sexual orientation, or age.<\\/li>\\r\\n  <li>Infringe any patent, trademark, trade secret, copyright, or other intellectual property or other rights of any other person.<\\/li>\\r\\n  <li>Violate the legal rights (including the rights of publicity and privacy) of others or contain any material that could give rise to any civil or criminal liability under applicable laws or regulations or that otherwise may be in conflict with these Terms of Use and our Privacy Policy.<\\/li>\\r\\n  <li>Be likely to deceive any person.<\\/li>\\r\\n  <li>Promote any illegal activity, or advocate, promote, or assist any unlawful act.<\\/li>\\r\\n  <li>Cause annoyance, inconvenience, or needless anxiety or be likely to upset, embarrass, alarm, or annoy any other person.<\\/li>\\r\\n  <li>Impersonate any person, or misrepresent your identity or affiliation with any person or organization.<\\/li>\\r\\n  <li>Involve commercial activities or sales, such as contests, sweepstakes, and other sales promotions, barter, or advertising.<\\/li>\\r\\n  <li>Give the impression that they emanate from or are endorsed by us or any other person or entity, if this is not the case.<\\/li>\\r\\n<\\/ul>\\r\\n<p><\\/p>\\r\\n<h6>Copyright Infringement<\\/h6>\\r\\n\\r\\n<p>If you believe that any User Contributions violate your copyright, please contact us and send us a notice of copyright infringement. It is the policy of the Company to terminate the user accounts of repeat infringers. In accordance with the Digital Millennium Copyright Act of 1998 (&ldquo;DMCA&rdquo;), the text of which can be found on the U.S. Copyright Office website, we will respond appropriately to claims and reports of copyright infringement taking place on or through the Websites. If you believe that one of our users is, through the use of our Website, unlawfully infringing the copyright(s) in a work, and wish to have the allegedly infringing material removed, the following information in the form of a written notification (pursuant to 17 U.S.C. &sect; 512(c)) must be provided to our designated Copyright Agent:<\\/p>\\r\\n\\r\\n<p>Please note that, pursuant to 17 U.S.C. &sect; 512(f), any misrepresentation of material fact (falsities) in a written notification automatically subjects the complaining party to liability for any damages, costs and attorney&rsquo;s fees incurred by us in connection with the written notification and allegation of copyright infringement.<\\/p>\\r\\n\\r\\n<p>The Designated Copyright Agent for Green Market Exchange is:<\\/p>\\r\\n\\r\\n<p>Copyright Agent<br \\/>\\r\\nChristian Stratka<br \\/>\\r\\nGreen Market Exchange, LLC<br \\/>\\r\\nADDRESS<br \\/>\\r\\nEmail: <a href=\\\"mailto:notifications@greenmarketexchange.com\\\">notifications@greenmarketexchange.com<\\/a><\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>Your physical or electronic signature;<\\/li>\\r\\n  <li>Identification of the copyrighted work(s) that you claim to have been infringed;<\\/li>\\r\\n  <li>Identification of the material on our services that you claim is infringing and that you request us to remove;<\\/li>\\r\\n  <li>Sufficient information to permit us to locate such material;<\\/li>\\r\\n  <li>Your address, telephone number, and e-mail address;<\\/li>\\r\\n  <li>A statement that you have a good faith belief that use of the objectionable material is not authorized by the copyright owner, its agent, or under the law; and<\\/li>\\r\\n  <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are either the owner of the copyright that has allegedly been infringed or that you are authorized to act on behalf of the copyright owner.<\\/li>\\r\\n<\\/ul>\\r\\n<p><\\/p>\\r\\n<h6>Reliance on Information Posted<\\/h6>\\r\\n\\r\\n<p>The information presented on or through the Website is made available solely for general information purposes. We do not warrant the accuracy, completeness, or usefulness of this information. Any reliance you place on such information is strictly at your own risk. We disclaim all liability and responsibility arising from any reliance placed on such materials by you or any other visitor to the Website, or by anyone who may be informed of any of its contents.<\\/p>\\r\\n\\r\\n<p>We do not offer any medical advice, and any information presented on our Website is not intended to be a substitute for medical advice.<\\/p>\\r\\n\\r\\n<p>This Website may include content provided by third parties, including materials provided by other users, bloggers, and third-party licensors, syndicators, aggregators, and\\/or reporting services. All statements and\\/or opinions expressed in these materials, and all articles and responses to questions and other content, other than the content provided by the Company, are solely the opinions and the responsibility of the person or entity providing those materials. These materials do not necessarily reflect the opinion of the Company. We are not responsible, or liable to you or any third party, for the content or accuracy of any materials provided by any third parties.<\\/p>\\r\\n\\r\\n<h6>Acknowledgment of Federal and State Laws<\\/h6>\\r\\n\\r\\n<p>You expressly acknowledge that this Website is for residents of states and localities with laws regulating medical or the recreational use of cannabis only and that medical cannabis collectives and patients are established pursuant to their respective local laws. Marijuana is included on Schedule 1 under the United States Controlled Substances Act. Under the federal laws of the United States of America, manufacturing, distributing, dispensing or possession of marijuana is illegal, and individuals are subject to arrest and\\/or prosecution for doing so. User further acknowledges that medical use is not recognized as a valid defense under federal laws regarding marijuana. User also acknowledges that the interstate transportation of marijuana is a federal offense.<\\/p>\\r\\n\\r\\n<h6>Changes to the Website<\\/h6>\\r\\n\\r\\n<p>We may update the content on this Website from time to time, but its content is not necessarily complete or up-to-date. Any of the material on the Website may be out of date at any given time, and we are under no obligation to update such material.<\\/p>\\r\\n\\r\\n<h6>Information About You and Your Visits to the Website<\\/h6>\\r\\n\\r\\n<p>All information we collect on this Website is subject to our Privacy Policy. By using the Website, you consent to all actions taken by us with respect to your information in compliance with the Privacy Policy.<\\/p>\\r\\n\\r\\n<p>[Online Purchases All purchases through our site or other transactions formed through the Website, or resulting from visits made by you, are governed by the following terms of sale [Additional terms and conditions may also apply to specific portions, services, or features of the Website. All such additional terms and conditions are hereby incorporated by this reference into these Terms of Use.]]<\\/p>\\r\\n\\r\\n<p><\\/p>\\r\\n<h6>Linking to the Website and Social Media Features<\\/h6>\\r\\n\\r\\n<p>You may link to our homepage, provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it, but you must not establish a link in such a way as to suggest any form of association, approval, or endorsement on our part.<\\/p>\\r\\n\\r\\n<p>This Website may provide certain social media features that enable you to:<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>Link from your own or certain third-party websites to certain content on this Website.<\\/li>\\r\\n  <li>Send emails or other communications with certain content, or links to certain content, on this Website.<\\/li>\\r\\n  <li>Cause limited portions of content on this Website to be displayed or appear to be displayed on your own or certain third-party websites.<\\/li>\\r\\n<\\/ul>\\r\\n<p><\\/p>\\r\\n<p>You may use these features solely as they are provided by us, solely with respect to the content they are displayed with, and otherwise in accordance with any additional terms and conditions we provide with respect to such features. Subject to the foregoing, you must not:<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>Establish a link from any website that is not owned by you.<\\/li>\\r\\n  <li>Cause the Website or portions of it to be displayed on, or appear to be displayed by, any other site, for example, framing, deep linking, or in-line linking.<\\/li>\\r\\n  <li>Link to any part of the Website other than the homepage.<\\/li>\\r\\n  <li>Otherwise take any action with respect to the materials on this Website that is inconsistent with any other provision of these Terms of Use.<\\/li>\\r\\n<\\/ul>\\r\\n<p><\\/p>\\r\\n<p>You agree to cooperate with us in causing any unauthorized framing or linking immediately to stop. We reserve the right to withdraw linking permission without notice. We may disable all or any social media features and any links at any time without notice in our discretion.<\\/p>\\r\\n\\r\\n<h6>Links from the Website<\\/h6>\\r\\n\\r\\n<p>If the Website contains links to other sites and resources provided by third parties, these links are provided for your convenience only. This includes links contained in advertisements, including banner advertisements and sponsored links. We have no control over the contents of those sites or resources, and accept no responsibility for them or for any loss or damage that may arise from your use of them. If you decide to access any of the third-party websites linked to this Website, you do so entirely at your own risk and subject to the terms and conditions of use for such websites.<\\/p>\\r\\n\\r\\n<h6>Geographic Restrictions<\\/h6>\\r\\n\\r\\n<p>We provide this Website for use only by persons located in the United States. We make no claims that the Website or any of its content is accessible or appropriate outside of the United States. Access to the Website may not be legal by certain persons or in certain geographic areas. If you access the Website from outside the United States, you do so on your own initiative and are responsible for compliance with local laws.<\\/p>\\r\\n\\r\\n<h6>Disclaimer of Warranties<\\/h6>\\r\\n\\r\\n<p>You understand that we cannot and do not guarantee or warrant that files available for downloading from the internet or the Website will be free of viruses or other destructive code. You are responsible for implementing sufficient procedures and checkpoints to satisfy your particular requirements for anti-virus protection and accuracy of data input and output, and for maintaining a means external to our site for any reconstruction of any lost data.<\\/p>\\r\\n\\r\\n<p>TO THE FULLEST EXTENT PROVIDED BY LAW, WE WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE CAUSED BY A DISTRIBUTED DENIAL-OF-SERVICE ATTACK, VIRUSES, OR OTHER TECHNOLOGICALLY HARMFUL MATERIAL THAT MAY INFECT YOUR COMPUTER EQUIPMENT, COMPUTER PROGRAMS, DATA, OR OTHER PROPRIETARY MATERIAL DUE TO YOUR USE OF THE WEBSITE OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE OR TO YOUR DOWNLOADING OF ANY MATERIAL POSTED ON IT, OR ON ANY WEBSITE LINKED TO IT.<\\/p>\\r\\n\\r\\n<p><\\/p>\\r\\n<p>YOUR USE OF THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE IS AT YOUR OWN RISK. THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER THE COMPANY NOR ANY PERSON ASSOCIATED WITH THE COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE WEBSITE. WITHOUT LIMITING THE FOREGOING, NEITHER THE COMPANY NOR ANYONE ASSOCIATED WITH THE COMPANY REPRESENTS OR WARRANTS THAT THE WEBSITE, ITS CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT OUR SITE OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR THAT THE WEBSITE OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.<\\/p>\\r\\n\\r\\n<p>TO THE FULLEST EXTENT PROVIDED BY LAW, THE COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.<\\/p>\\r\\n\\r\\n<p>THE FOREGOING DOES NOT AFFECT ANY WARRANTIES THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.<\\/p>\\r\\n\\r\\n<h6>Limitation on Liability<\\/h6>\\r\\n\\r\\n<p>TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE COMPANY, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE WEBSITE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE WEBSITE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE. THE FOREGOING DOES NOT AFFECT ANY LIABILITY THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.<\\/p>\\r\\n\\r\\n<h6>Indemnification<\\/h6>\\r\\n\\r\\n<p>You agree to defend, indemnify, and hold harmless the Company, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&#39; fees) arising out of or relating to your violation of these Terms of Use or your use of the Website, including, but not limited to, your User Contributions, any use of the Website&#39;s content, services, and products other than as expressly authorized in these Terms of Use, or your use of any information obtained from the Website.<\\/p>\\r\\n\\r\\n<h6>Governing Law and Jurisdiction<\\/h6>\\r\\n\\r\\n<p>All matters relating to the Website and these Terms of Use, and any dispute or claim arising therefrom or related thereto (in each case, including non-contractual disputes or claims), shall be governed by and construed in accordance with the internal laws of the State of Maine without giving effect to any choice or conflict of law provision or rule (whether of the State of Maine or any other jurisdiction). Any legal suit, action, or proceeding arising out of, or related to, these Terms of Use or the Website shall be instituted exclusively in the federal courts of the United States or the courts of the State of Maine, although we retain the right to bring any suit, action, or proceeding against you for breach of these Terms of Use in your jurisdiction of residence or any other relevant jurisdiction. You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.<\\/p>\\r\\n\\r\\n<h6>Arbitration<\\/h6>\\r\\n\\r\\n<p>At Company&#39;s sole discretion, it may require You to submit any disputes arising from these Terms of Use or use of the Website, including disputes arising from or concerning their interpretation, violation, invalidity, non-performance, or termination, to final and binding arbitration under the Rules of Arbitration of the American Arbitration Association applying Maine law.<\\/p>\\r\\n\\r\\n<h6>Waiver and Severability<\\/h6>\\r\\n\\r\\n<p>No waiver by the Company of any term or condition set out in these Terms of Use shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of the Company to assert a right or provision under these Terms of Use shall not constitute a waiver of such right or provision. If any provision of these Terms of Use is held by a court or other tribunal of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Terms of Use will continue in full force and effect.<\\/p>\\r\\n\\r\\n<h6>Entire Agreement<\\/h6>\\r\\n\\r\\n<p>The Terms of Use and our Privacy Policy constitute the sole and entire agreement between you and Green Market Exchange, LLC regarding the Website and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral, regarding the Website.<\\/p>\\r\\n\\r\\n<h6>Your Comments and Concerns<\\/h6>\\r\\n\\r\\n<p>This website is operated by Green Market Exchange, LLC, a Maine limited liability company. All feedback, comments, requests for technical support, and other communications relating to the Website should be directed to: <a href=\\\"mailto:notifications@greenmarketexchange.com\\\">notifications@greenmarketexchange.com<\\/a><\\/p>\",\"meta_title\":\"Terms Of Use\",\"meta_keyword\":\"Terms Of Use\",\"meta_description\":\"Terms Of Use\"}', '2022-04-14 04:02:23', '2022-11-23 05:45:15', NULL),
(1, 3, 'About us', 'about-us', '{\"section1_main_title\":\"About Us\",\"section1_title\":\"Our Goal\",\"section1_description\":\"Green Market Exchange strives to be the central provider of cannabis wholesale market information and data for the cannabis business ecosystem. We aspire to create and develop a world class platform to connect cannabis based companies from every corner of the globe with the hopes of making the world a greener place.\",\"section1_list_title1\":\"The Future is Green\",\"section1_list_description1\":\"<p>The cannabis indusustry is poised to explode to new hights. At Green Market Exchange, we&#39;re buliding a community and marketplace to be part of your journey into the green frontier.&nbsp;<\\/p>\",\"section1_list_image1\":\"\\/cms\\/1653912907-about-img.jpg\",\"section1_list_title2\":\"Power in Perspective\",\"section1_list_description2\":\"<p>Green Market Exchange values diversity in perspective. As we continue to devlop our platform and grow our product offerings, we ask our users and the community to be transparent with us and offer suggestions to help us create true value for you,&nbsp;the community and the industry.<\\/p>\",\"section1_list_image2\":\"\\/cms\\/1653912907-about-tag-img.jpg\",\"section2_main_title\":\"Our Roots\",\"section2_description\":\"<p>Green Market Exchange was founded in 2020 on the basis of cannabis being a health beneficial product and a positive alternative to other common consumable products. Green Market Exchange&nbsp;believes cannabis is a natural&nbsp;medicine that has the potenial to not only better invidual health but connect society in an optimistic&nbsp;manner as the cannabis community envokes peace.&nbsp;We hope to not only create an awesome product but more importantly a platform that connects, inspires and radiates the values&nbsp;of the cannabis community.<\\/p>\",\"section2_quote\":\"\",\"section2_image\":\"\\/cms\\/1650008538-cart-image-7.png\",\"meta_title\":\"About Us\",\"meta_keyword\":\"About Us\",\"meta_description\":\"About Us\"}', '2022-04-14 04:02:23', '2022-12-07 16:55:39', NULL),
(1, 4, 'Contact us', 'contact-us', NULL, '2022-07-11 13:19:52', '2022-07-11 13:19:52', NULL);
INSERT INTO `cms` (`isActive`, `id`, `name`, `slug`, `content`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 5, 'Privacy Policy', 'privacy-policy', '{\"main_title\":\"Privacy Policy\",\"main_content\":\"<p>Green Market Exchange Inc. (&quot;Company&quot;, &quot;We&quot;, or &ldquo;Us&rdquo;) respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website <a href=\\\"https:\\/\\/www.greenmarketexchange.com\\/\\\" target=\\\"_blank\\\">https:\\/\\/www.greenmarketexchange.com<\\/a> (our &quot;Website&quot;) and our practices for collecting, using, maintaining, protecting, and disclosing that information.<\\/p>\\r\\n\\r\\n<p>This policy applies to information we collect on this Website, as well as, any related online services, sales, marketing, or events we conduct (including in any electronic messages between you and us). It does not apply to information collected by us offline or through any other means, including on any other website operated by us or any third party, including through any application or content (including advertising) that may link to or be accessible from or on the Website.<\\/p>\\r\\n\\r\\n<p>Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, your choice is not to use our Website. By accessing or using this Website, you agree to this privacy policy. This policy may change from time to time. Your continued use of this Website after we make changes is deemed to be acceptance of those changes, so please check the policy periodically for updates.<\\/p>\\r\\n\\r\\n<h6>Children Under the Age of 18<\\/h6>\\r\\n\\r\\n<p>Our Website is not intended for anyone under 21 years of age. No one under age 21 may provide any personal information to the Website. We do not knowingly collect personal information from children under 18. If you are under 21, do not use or provide any information on this Website. If we learn we have collected or received personal information from a child under 18 without verification of parental consent, we will delete that information. If you believe we might have any information from or about a child under 18, please contact us at <a href=\\\"mailto:notifications@greenmarketexchange.com\\\">notifications@greenmarketexchange.com<\\/a>.<\\/p>\\r\\n\\r\\n<h6>Information We Collect About You and How We Collect It<\\/h6>\\r\\n\\r\\n<p>We collect several types of information from and about users of our Website, including information:<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>By which you may be personally identified, such as name, postal address (in whole or part), e-mail address, telephone number, job title, professional experience, or any other identifier by which you may be contacted online or offline (&quot;personal information&quot;);<\\/li>\\r\\n  <li>Some users may also submit their (i) means of age verification, or (ii) medical marijuana recommendation, including their recommending doctor&rsquo;s name and license number, contact information, verification methodology, and verification number (&ldquo;Medical Marijuana Information&rdquo;).<\\/li>\\r\\n  <li>That is about you but individually does not identify you; and\\/or<\\/li>\\r\\n  <li>About your IP address, browser, network, device, internet connection, the equipment you use to access our Website, and Website usage details (including, without limitation, clinks, internal links, pages visited, scrolling, searches, and timestamps).<\\/li>\\r\\n<\\/ul>\\r\\n<p><\\/p>\\r\\n<p>We collect this information:<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>Directly from you when you voluntarily provide it to us.<\\/li>\\r\\n  <li>Automatically as you navigate through the site. Information collected automatically may include usage details, IP addresses, and information collected through cookies, web beacons, and other tracking technologies.<\\/li>\\r\\n  <li>From third parties, for example, our business partners.<\\/li>\\r\\n<\\/ul>\\r\\n<p><\\/p>\\r\\n<h6>Information You Provide to Us<\\/h6>\\r\\n\\r\\n<p>The information we collect on or through our Website may include:<\\/p>\\r\\n<ul>\\r\\n  <li>Information that you provide by filling in forms on our Website. This includes information provided at the time of purchasing or using our services or products, subscribing to our newsletter, registering for courses we host, or otherwise registering to use our Website. We may also ask you for information when you report a problem with our Website (When you submit information to this website via webform, we collect the data requested in the webform in order to track and respond to your submissions. We may share this information with our Website hosting provider, so that they can provide website services to us.<\\/li>\\r\\n  <li>Records and copies of your correspondence (including email addresses), if you contact us.<\\/li>\\r\\n  <li>Details of transactions you carry out through our Website and of the fulfillment of your orders. You may be required to provide financial information before placing an order through our Website.<\\/li>\\r\\n  <li>Information you otherwise provide us via our Website.<\\/li>\\r\\n<\\/ul>\\r\\n\\r\\n<p><\\/p>\\r\\n<p>You also may provide information to be published or displayed (hereinafter, &quot;posted&quot;) on public areas of the Website, or transmitted to other users of the Website or third parties (collectively, &quot;User Contributions&quot;). Your User Contributions are posted on and transmitted to others at your own risk. Although, please be aware that no security measures are perfect or impenetrable. Additionally, we cannot control the actions of other users of the Website with whom you may choose to share your User Contributions. Therefore, we cannot and do not guarantee that your User Contributions will not be viewed by unauthorized persons.<\\/p>\\r\\n\\r\\n<h6>Information We Collect Through Automatic Data Collection Technologies<\\/h6>\\r\\n\\r\\n<p>As you navigate through and interact with our Website, we may use automatic data collection technologies to collect certain information about your equipment, browsing actions, and patterns, including:<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>Details of your visits to our Website and other communication data and the resources that you access and use on the Website.<\\/li>\\r\\n  <li>Information about your computer and internet connection, including your IP address, operating system, and browser type.<\\/li>\\r\\n<\\/ul>\\r\\n<p><\\/p>\\r\\n\\r\\n<p>We also may use these technologies to collect information about your online activities over time and across third-party websites or other online services (behavioral tracking). The information we collect automatically may include personal information or we may maintain it or associate it with personal information we collect in other ways or receive from third parties. It helps us to improve our Website and to deliver a better and more personalized service, including by enabling us to:<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>Estimate our audience size and usage patterns.<\\/li>\\r\\n  <li>Store information about your preferences, allowing us to customize our Website according to your individual interests.<\\/li>\\r\\n  <li>Speed up your searches.<\\/li>\\r\\n  <li>Recognize you when you return to our Website.<\\/li>\\r\\n<\\/ul>\\r\\n<p><\\/p>\\r\\n<p>The technologies we use for this automatic data collection may include:<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>Cookies (or browser cookies). A cookie is a small file placed on the hard drive of your computer. You may refuse to accept browser cookies by activating the appropriate setting on your browser. However, if you select this setting you may be unable to access certain parts of our Website. Unless you have adjusted your browser setting so that it will refuse cookies, our system will issue cookies when you direct your browser to our Website. We may share information with our website analytics provider, google analytics, to learn about site traffic and activity. Flash Cookies. Certain features of our Website may use local stored objects (or Flash cookies) to collect and store information about your preferences and navigation to, from, and on our Website.<\\/li>\\r\\n  <li>Flash Cookies. Certain features of our Website may use local stored objects (or Flash cookies) to collect and store information about your preferences and navigation to, from, and on our Website. Flash cookies are not managed by the same browser settings as are used for browser cookies. For information about managing your privacy and security settings for Flash cookies, see Choices About How We Use and Disclose Your Information.<\\/li>\\r\\n  <li>Web Beacons. Pages of our the Website and our e-mails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of certain website content and verifying system and server integrity).<\\/li>\\r\\n<\\/ul>\\r\\n\\r\\n<p><\\/p>\\r\\n<h6>Third-Party Use of Cookies and Other Tracking Technologies<\\/h6>\\r\\n\\r\\n<p>Some content or applications, including advertisements, on the Website are served by third-parties, including advertisers, ad networks and servers, content providers, and application providers. These third parties may use cookies alone or in conjunction with web beacons or other tracking technologies to collect information about you when you use our website. The information they collect may be associated with your personal information or they may collect information, including personal information, about your online activities over time and across different websites and other online services. They may use this information to provide you with interest-based (behavioral) advertising or other targeted content. Our third-party services may include Amazon Web Services, google analytics, and may include others in the future. We do not control these third parties&#39; tracking technologies or how they may be used. If you have any questions about an advertisement or other targeted content, you should contact the responsible provider directly. For information about how you can opt out of receiving targeted advertising from many providers, see Choices About How We Use and Disclose Your Information.<\\/p>\\r\\n\\r\\n<h6>How We Use Your Information<\\/h6>\\r\\n\\r\\n<p>We use information that we collect about you or that you provide to us, including any personal information:<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>To present our Website and its contents to you.<\\/li>\\r\\n  <li>To provide you with information, products, or services that you request from us.<\\/li>\\r\\n  <li>To fulfill any other purpose for which you provide it.<\\/li>\\r\\n  <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection.<\\/li>\\r\\n  <li>To notify you about changes to our Website or any products or services we offer or provide though it.<\\/li>\\r\\n  <li>In any other way we may describe when you provide the information.<\\/li>\\r\\n  <li>For any other purpose with your consent.<\\/li>\\r\\n<\\/ul>\\r\\n\\r\\n<p><\\/p>\\r\\n<p>We may also use your information to contact you about our own and third-parties&#39; goods and services and\\/or promotional offers that may be of interest to you, industry news and dates, and other information via email newsletter. If you do not want us to use your information in this way, please click &ldquo;unsubscribe&rdquo; from any email newsletter you may receive from us in the future.<\\/p>\\r\\n\\r\\n<p>We may use the information we have collected from you to enable us to display advertisements to our advertisers&#39; target audiences. Even though we do not disclose your personal information for these purposes without your consent, if you click on or otherwise interact with an advertisement, the advertiser may assume that you meet its target criteria.<\\/p>\\r\\n\\r\\n<h6>Disclosure of Your Information<\\/h6>\\r\\n\\r\\n<p>We may disclose aggregated information about our users, and information that does not identify any individual, without restriction.<\\/p>\\r\\n\\r\\n<p>We may disclose personal information that we collect or you provide as described in this privacy policy:<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>To our subsidiaries and affiliates.<\\/li>\\r\\n  <li>To contractors, service providers, and other third parties we use to support our business[ and who are bound by contractual obligations to keep personal information confidential and use it only for the purposes for which we disclose it to them.<\\/li>\\r\\n  <li>To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which personal information held by us about our Website users is among the assets transferred.<\\/li>\\r\\n  <li>To third parties to market their products or services to you if you have not opted out of these disclosures.<\\/li>\\r\\n  <li>To fulfill the purpose for which you provide it. For example, if you give us an email address to use the &quot;email a friend&quot; feature of our Website, we will transmit the contents of that email and your email address to the recipients.<\\/li>\\r\\n  <li>For any other purpose disclosed by us when you provide the information.<\\/li>\\r\\n  <li>With your consent.<\\/li>\\r\\n<\\/ul>\\r\\n\\r\\n<p><\\/p>\\r\\n<p>We may also disclose your personal information:<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>To comply with any court order, law, or legal process, including to respond to any government or regulatory request.<\\/li>\\r\\n  <li>Medical Marijuana Information may need to be disclosed, along with other required information, for the purpose of calculating taxes, ensuring legal compliance.<\\/li>\\r\\n  <li>To enforce or apply our terms of use and other agreements, including for billing and collection purposes.<\\/li>\\r\\n  <li>If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of us, our customers, or others. This includes exchanging information with other companies and organizations for the purposes of fraud protection and credit risk reduction.<\\/li>\\r\\n<\\/ul>\\r\\n\\r\\n<p><\\/p>\\r\\n<h6>Choices About How We Use and Disclose Your Information<\\/h6>\\r\\n\\r\\n<p>We strive to provide you with choices regarding the personal information you provide to us. We have created mechanisms to provide you with the following control over your information:<\\/p>\\r\\n\\r\\n<ul>\\r\\n  <li>Tracking Technologies and Advertising. You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. To learn how you can manage your Flash cookie settings, visit the Flash player settings page on Adobe&#39;s website. If you disable or refuse cookies, please note that some parts of this site may then be inaccessible or not function properly.<\\/li>\\r\\n<\\/ul>\\r\\n\\r\\n<p><\\/p>\\r\\n<p>We do not control third parties&#39; collection or use of your information to serve interest-based advertising. However these third parties may provide you with ways to choose not to have your information collected or used in this way. You can opt out of receiving targeted ads from members of the Network Advertising Initiative (&quot;NAI&quot;) on the NAI&#39;s website.<\\/p>\\r\\n\\r\\n<h6>Accessing and Correcting Your Information<\\/h6>\\r\\n\\r\\n<p>You may also send us an email at <a href=\\\"mailto:notifications@greenmarketexchange.com\\\">notifications@greenmarketexchange.com<\\/a> to request access to, correct or delete any personal information that you have provided to us. We cannot however, guarantee that can delete any such information once it has already been provided to us and\\/or third parties. In certain cases, we cannot delete your personal information except by also deleting your user account. We may not accommodate a request to change information if we believe the change would violate any law or legal requirement or cause the information to be incorrect. If you delete your User Contributions from the Website, copies of your User Contributions may remain viewable in cached and archived pages, or might have been copied or stored by other Website users.<\\/p>\\r\\n\\r\\n<h6>Your California Privacy Rights<\\/h6>\\r\\n\\r\\n<p>California&#39;s &quot;Shine the Light&quot; law (Civil Code Section &sect; 1798.83) permits users who are California residents to request certain information regarding our disclosure of personal information to third parties for their direct marketing purposes. To make such a request, please send an email to <a href=\\\"mailto:notifications@greenmarketexchange.com\\\">notifications@greenmarketexchange.com<\\/a>.<\\/p>\\r\\n\\r\\n<p>If you are under 18 years of age, reside in California, and have a registered account with the Website, you have the right to request removal of unwanted data that you publicly post on the Website. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Website, but please be aware that the data may not be completely or comprehensively removed from all our systems (e.g. backups, etc.).<\\/p>\\r\\n\\r\\n<h6>Data Security<\\/h6>\\r\\n\\r\\n<p>We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for access to certain parts of our Website, you are responsible for keeping this password confidential. We ask you not to share your password with anyone. Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our Website. Any transmission of personal information is at your own risk. We are not responsible for circumvention of any privacy settings or security measures contained on the Website.<\\/p>\\r\\n\\r\\n<h6>Changes to Our Privacy Policy<\\/h6>\\r\\n\\r\\n<p>It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users&#39; personal information, we will notify you by email to the email address specified in your account and\\/or through a notice on the Website home page. The date the privacy policy was last revised is identified at the top of the page. You are responsible for ensuring we have an up-to-date active and deliverable email address for you, and for periodically visiting our Website and this privacy policy to check for any changes.<\\/p>\\r\\n\\r\\n<h6>Contact Information<\\/h6>\\r\\n\\r\\n<p>To ask questions or comment about this privacy policy and our privacy practices, contact us at:<\\/p>\\r\\n\\r\\n<p><a href=\\\"mailto:notifications@greenmarketexchange.com\\\">notifications@greenmarketexchange.com<\\/a><\\/p>\",\"meta_title\":\"Privacy Policy\",\"meta_keyword\":\"Privacy Policy\",\"meta_description\":\"Privacy Policy\"}', '2022-11-11 17:51:01', '2022-11-23 05:34:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `userId` int DEFAULT NULL,
  `postId` int DEFAULT NULL,
  `comment` text,
  `commentUniqueId` varchar(255) DEFAULT NULL,
  `replyCount` int DEFAULT '0',
  `likeCount` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `comment_like`
--

CREATE TABLE `comment_like` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `userId` int DEFAULT NULL,
  `commentId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `comment_replies`
--

CREATE TABLE `comment_replies` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `commentId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `reply` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `email_template`
--

CREATE TABLE `email_template` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `headerId` int DEFAULT NULL,
  `footerId` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `body` text,
  `status` enum('1','2') DEFAULT NULL COMMENT '1 for active, 2 for inactive',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `email_template`
--

INSERT INTO `email_template` (`isActive`, `id`, `headerId`, `footerId`, `title`, `subject`, `body`, `status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 1, 1, 'Welcome', 'Welcome to GMX', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\r\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\'; margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\r\n			<h2 style=\"font-family: Arial, sans-serif, \'Open Sans\'; font-weight: bold;margin-top: 0px; margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">Welcome {NAME}</h2>\r\n			<!-- <p style=\"margin-top: 0px;margin-bottom: 0px;\">That thus much less heron other hello</p> --></div>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top: 16px;padding-bottom: 16px;\">\r\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\'; margin-top: 0px; margin-bottom: 0px; font-size: 14px; line-height: 24px; max-width: 584px; color: #424651; text-align: center;\">\r\n			<p style=\"margin-top: 0px;margin-bottom: 0px;\">Thank you for signing up to become a member of our online marketplace. you have one last step to discover amazing brands.</p>\r\n\r\n			<p style=\"margin-top: 0px;margin-bottom: 0px;\">Start <a href=\"{LINK}\" style=\"text-decoration: underline;\">here</a> and sign in!</p>\r\n			<!--<p style=\"margin-top: 0px;margin-bottom: 0px;\">We look forward to welcoming you.</p>--></div>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>', '1', '2021-02-01 01:27:51', '2022-03-10 07:03:58', NULL),
(1, 2, 1, 1, 'Reset password | User', 'Reset Password', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n	<tbody>\n		<tr>\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\n			<h2 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">Reset Password</h2>\n			</div>\n			</td>\n		</tr>\n	</tbody>\n</table>\n\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n	<tbody>\n		<tr>\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top: 16px;padding-bottom: 16px;\">\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;max-width: 584px;color: #424651;text-align: center;\">\n			<p style=\"margin-top: 0px;margin-bottom: 0px;\">Dear <b>{NAME}</b>, you are receiving this email because you requested to reset your password at GMX.</p>\n\n			<p style=\"margin-top: 30px;margin-bottom: 0px;\">Click the button below to reset your password.</p>\n			</div>\n			</td>\n		</tr>\n	</tbody>\n</table>\n\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n	<tbody>\n		<tr>\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:18px;padding-bottom: 8px;\">\n			<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n				<tbody>\n					<tr>\n						<td align=\"center\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #22a612;border-radius: 10px; border :thin solid #22a612;\" width=\"210\"><a href=\"{LINK}\" style=\"text-decoration: none;outline: none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;\">RESET PASSWORD</a></td>\n					</tr>\n				</tbody>\n			</table>\n			</td>\n		</tr>\n	</tbody>\n</table>\n\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n	<tbody>\n		<tr>\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top: 16px;padding-bottom: 16px;\">\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;max-width: 584px;color: #424651;text-align: center;\">\n			<p style=\"margin-top: 0px;margin-bottom: 0px;\">If you did not request this, please contact <a href=\"{LINK_1}\">support</a> for assistance.</p>\n			</div>\n			</td>\n		</tr>\n	</tbody>\n</table>', '1', '2022-05-10 00:00:00', '2022-05-10 00:00:00', NULL),
(1, 3, 1, 1, 'Contact Us | Admin', 'Contact us', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" data-module=\"hero-white-icon-outline0\" role=\"presentation\" width=\"100%\">\n	<tbody>\n		<tr>\n			<td align=\"center\" data-bgcolor=\"Bg White\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\"><!--[if mso]>\n            <table width=\"584\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" role=\"presentation\">\n               <tbody>\n                  <tr>\n                     <td align=\"center\">\n                        <![endif]-->\n			<div data-color=\"Light\" data-max=\"23\" data-min=\"15\" data-size=\"Text MD\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\n			<h2 data-color=\"Dark\" data-max=\"40\" data-min=\"20\" data-size=\"Heading 2\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">Contact us</h2>\n			<!-- <p style=\"margin-top: 0px;margin-bottom: 0px;\">That thus much less heron other hello</p> --></div>\n			<!--[if mso]>\n                     </td>\n                  </tr>\n            </table>\n            <![endif]--></td>\n		</tr>\n	</tbody>\n</table>\n\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\">\n	<tbody>\n		<tr>\n			<td><!--[if mso]>\n            <table width=\"800\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" role=\"presentation\">\n               <tbody>\n                  <tr>\n                     <td>\n                        <![endif]-->\n			<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"max-width: 600px;margin: 0 auto;\" width=\"100%\">\n				<tbody>\n					<tr>\n						<td align=\"center\" data-bgcolor=\"Bg White\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\"><!--[if mso]>\n                                    <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" role=\"presentation\">\n                                       <tbody>\n                                          <tr>\n                                             <td width=\"300\" align=\"left\" valign=\"top\" style=\"padding: 0px 8px;\">\n                                                <![endif]-->\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;max-width: 600px;\">\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div data-color=\"Light\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<h4 data-color=\"Dark\" data-max=\"26\" data-min=\"10\" data-size=\"Heading 4\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">First Name</h4>\n						</div>\n						</div>\n						<!--[if mso]>\n                                             </td>\n                                             <td width=\"100\" align=\"right\" valign=\"top\" style=\"padding: 0px 8px;\">\n                                                <![endif]-->\n\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;max-width: 600px;\">\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<p style=\"margin-top: 0px;margin-bottom: 4px;\">{FIRST_NAME}</p>\n						</div>\n						</div>\n						<!--[if mso]>\n                                             </td>\n                                          </tr>\n                                    </table>\n                                    <![endif]--></td>\n					</tr>\n					<tr>\n						<td align=\"center\" data-bgcolor=\"Bg White\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\"><!--[if mso]>\n                                                                            <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" role=\"presentation\">\n                                                                               <tbody>\n                                                                                  <tr>\n                                                                                     <td width=\"300\" align=\"left\" valign=\"top\" style=\"padding: 0px 8px;\">\n                                                                                        <![endif]-->\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;max-width: 600px;\">\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div data-color=\"Light\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<h4 data-color=\"Dark\" data-max=\"26\" data-min=\"10\" data-size=\"Heading 4\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Last Name</h4>\n						</div>\n						</div>\n						<!--[if mso]>\n                                                                                     </td>\n                                                                                     <td width=\"100\" align=\"right\" valign=\"top\" style=\"padding: 0px 8px;\">\n                                                                                        <![endif]-->\n\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;max-width: 600px;\">\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<p style=\"margin-top: 0px;margin-bottom: 4px;\">{LAST_NAME}</p>\n						</div>\n						</div>\n						<!--[if mso]>\n                                                                                     </td>\n                                                                                  </tr>\n                                                                            </table>\n                                                                            <![endif]--></td>\n					</tr>\n					<tr>\n						<td align=\"center\" data-bgcolor=\"Bg White\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\"><!--[if mso]>\n                                    <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" role=\"presentation\">\n                                       <tbody>\n                                          <tr>\n                                             <td width=\"300\" align=\"left\" valign=\"top\" style=\"padding: 0px 8px;\">\n                                                <![endif]-->\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;max-width: 600px;\">\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div data-color=\"Light\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<h4 data-color=\"Dark\" data-max=\"26\" data-min=\"10\" data-size=\"Heading 4\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Email</h4>\n						</div>\n						</div>\n						<!--[if mso]>\n                                             </td>\n                                             <td width=\"100\" align=\"right\" valign=\"top\" style=\"padding: 0px 8px;\">\n                                                <![endif]-->\n\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;max-width: 600px;\">\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<p style=\"margin-top: 0px;margin-bottom: 4px;\">{EMAIL}</p>\n						</div>\n						</div>\n						<!--[if mso]>\n                                             </td>\n                                          </tr>\n                                    </table>\n                                    <![endif]--></td>\n					</tr>\n					<tr>\n						<td align=\"center\" data-bgcolor=\"Bg White\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\"><!--[if mso]>\n                                                        <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" role=\"presentation\">\n                                                           <tbody>\n                                                              <tr>\n                                                                 <td width=\"300\" align=\"left\" valign=\"top\" style=\"padding: 0px 8px;\">\n                                                                    <![endif]-->\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;max-width: 600px;\">\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div data-color=\"Light\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<h4 data-color=\"Dark\" data-max=\"26\" data-min=\"10\" data-size=\"Heading 4\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Phone Number</h4>\n						</div>\n						</div>\n						<!--[if mso]>\n                                                                 </td>\n                                                                 <td width=\"100\" align=\"right\" valign=\"top\" style=\"padding: 0px 8px;\">\n                                                                    <![endif]-->\n\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;max-width: 600px;\">\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<p style=\"margin-top: 0px;margin-bottom: 4px;\">{PHONE_NUMBER}</p>\n						</div>\n						</div>\n						<!--[if mso]>\n                                                                 </td>\n                                                              </tr>\n                                                        </table>\n                                                        <![endif]--></td>\n					</tr>\n					<tr>\n						<td align=\"center\" data-bgcolor=\"Bg White\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\"><!--[if mso]>\n                                    <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" role=\"presentation\">\n                                       <tbody>\n                                          <tr>\n                                             <td width=\"300\" align=\"left\" valign=\"top\" style=\"padding: 0px 8px;\">\n                                                <![endif]-->\n						<div style=\"display: inline-block;vertical-align: top;width: 100%;\">\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div data-color=\"Light\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<h4 data-color=\"Dark\" data-max=\"26\" data-min=\"10\" data-size=\"Heading 4\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Message</h4>\n						</div>\n						</div>\n						<!--[if mso]>\n                                             </td>\n                                          </tr>\n                                    </table>\n                                    <![endif]--></td>\n					</tr>\n					<tr>\n						<td align=\"center\" data-bgcolor=\"Bg White\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\"><!--[if mso]>\n                                    <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" role=\"presentation\">\n                                       <tbody>\n                                          <tr>\n                                             <td width=\"100\" align=\"left\" valign=\"top\" style=\"padding: 0px 8px;\">\n                                                <![endif]-->\n						<div style=\"display: inline-block;vertical-align: top;width: 100%;\">\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<p style=\"margin-top: 0px;margin-bottom: 4px;\">{MESSAGE}</p>\n						</div>\n						</div>\n						<!--[if mso]>\n                                             </td>\n                                          </tr>\n                                    </table>\n                                    <![endif]--></td>\n					</tr>\n				</tbody>\n			</table>\n			<!--[if mso]>\n                     </td>\n                  </tr>\n            </table>\n            <![endif]--></td>\n		</tr>\n	</tbody>\n</table>', '1', '2022-05-10 00:00:00', '2022-06-01 09:44:36', NULL),
(1, 4, 1, 1, 'Contact Us | User', 'Contact us', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" data-module=\"hero-white-icon-outline0\" role=\"presentation\" width=\"100%\">\n    <tbody>\n    <tr>\n    <td align=\"center\" data-bgcolor=\"Bg White\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\"><!--[if mso]>\n    <table width=\"584\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" role=\"presentation\">\n    <tbody>\n    <tr>\n    <td align=\"center\">\n    <![endif]-->\n    <div data-color=\"Light\" data-max=\"23\" data-min=\"15\" data-size=\"Text MD\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\n    <h2 data-color=\"Dark\" data-max=\"40\" data-min=\"20\" data-size=\"Heading 2\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">Thank you for getting in touch.</h2>\n    <!-- <p style=\"margin-top: 0px;margin-bottom: 0px;\">That thus much less heron other hello</p> --></div>\n    <!--[if mso]>\n    </td>\n    </tr>\n    </table>\n    <![endif]--></td>\n    </tr>\n    </tbody>\n    </table>\n    <!-- ------------------------------------------------ -->\n    \n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" data-module=\"button-dark0\" role=\"presentation\" width=\"100%\">\n    <tbody>\n    <tr>\n    <td align=\"center\" data-bgcolor=\"Bg White\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:18px;padding-bottom: 8px;\"><!-- -------------------------------------- -->\n    <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n    <tbody>\n    <tr>\n    <td align=\"center\" data-bgcolor=\"Bg White\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\n    <div data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;padding-left: 8px;padding-right: 8px;\">\n    <p style=\"margin-top: 0px;margin-bottom: 4px;\">We will review your message and come back to you shortly. Thank you for reaching out to the GMX. We look forward to connecting soon.</p>\n    </div>\n    </td>\n    </tr>\n    </tbody>\n    </table>\n    <!-- --------------------------------------- --></td>\n    </tr>\n    </tbody>\n    </table>', '1', '2022-05-10 00:00:00', '2022-05-10 00:00:00', NULL),
(1, 5, 1, 1, 'New member arrived. Retailer| Admin', 'New member arrived', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n   <tbody>\n      <tr>\n         <td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\n            <div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\n               <h2 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">New Member Arrived</h2>\n            </div>\n         </td>\n      </tr>\n   </tbody>\n</table>\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n   <tbody>\n      <tr>\n         <td>\n            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width: 600px;margin: 0 auto;\" width=\"100%\">\n               <tbody>\n                  <tr>\n                     <td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\n                        <div style=\"display: inline-block;vertical-align: top;width: 30%;\">\n                           <div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n                           <div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\n                              <h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Name</h4>\n                           </div>\n                        </div>\n                        <div style=\"display: inline-block;vertical-align: top;width: 70%;\">\n                           <div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n                           <div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\n                              <p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{NAME}</p>\n                           </div>\n                        </div>\n                     </td>\n                  </tr>\n                  <tr>\n                     <td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\n                        <div style=\"display: inline-block;vertical-align: top;width: 30%;\">\n                           <div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n                           <div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\n                              <h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Email</h4>\n                           </div>\n                        </div>\n                        <div style=\"display: inline-block;vertical-align: top;width: 70%;\">\n                           <div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n                           <div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\n                              <p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{EMAIL}</p>\n                           </div>\n                        </div>\n                     </td>\n                  </tr>\n                  <tr>\n                     <td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\n                        <div style=\"display: inline-block;vertical-align: top;width: 30%;\">\n                           <div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n                           <div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\n                              <h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Role</h4>\n                           </div>\n                        </div>\n                        <div style=\"display: inline-block;vertical-align: top;width: 70%;\">\n                           <div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n                           <div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\n                              <p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{ROLE}</p>\n                           </div>\n                        </div>\n                     </td>\n                  </tr>\n               </tbody>\n            </table>\n         </td>\n      </tr>\n   </tbody>\n</table>\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n   <tbody>\n      <tr>\n         <td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:18px;padding-bottom: 8px;\">\n            <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n               <tbody>\n                  <tr>\n                     <td align=\"center\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #22a612;border-radius: 4px;\" width=\"210\"><a href=\"{LINK}\" style=\"text-decoration: none;outline: none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;\">GO TO MEMBERS</a></td>\n                  </tr>\n               </tbody>\n            </table>\n         </td>\n      </tr>\n   </tbody>\n</table>', '1', '2022-05-10 00:00:00', '2022-05-10 00:00:00', NULL),
(1, 6, 1, 1, 'New member arrived. Brand | Admin', 'New member arrived', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n	<tbody>\n		<tr>\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\n			<h2 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">New Member Arrived.</h2>\n			</div>\n			</td>\n		</tr>\n	</tbody>\n</table>\n\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n	<tbody>\n		<tr>\n			<td align=\"center\" cstyle=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-bottom: 16px;\">\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;max-width: 584px;color: #424651;text-align: center;\">\n			<p style=\"margin-top: 0px;margin-bottom: 0px;\">(Selected plan : {PLAN})</p>\n			</div>\n			</td>\n		</tr>\n	</tbody>\n</table>\n\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n	<tbody>\n		<tr>\n			<td>\n			<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width: 600px;margin: 0 auto;\" width=\"100%\">\n				<tbody>\n				    <tr>\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Name</h4>\n						</div>\n						</div>\n\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{NAME}</p>\n						</div>\n						</div>\n						</td>\n					</tr>\n					<tr>\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Email</h4>\n						</div>\n						</div>\n\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{EMAIL}</p>\n						</div>\n						</div>\n						</td>\n					</tr>\n					<tr>\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Role</h4>\n						</div>\n						</div>\n\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{ROLE}</p>\n						</div>\n						</div>\n						</td>\n					</tr>\n				</tbody>\n			</table>\n			</td>\n		</tr>\n	</tbody>\n</table>\n\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n	<tbody>\n		<tr>\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:18px;padding-bottom: 8px;\">\n			<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n				<tbody>\n					<tr>\n						<td align=\"center\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #22a612;border-radius: 4px;\" width=\"210\"><a href=\"{LINK}\" style=\"text-decoration: none;outline: none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;\">GO TO MEMBERS</a></td>\n					</tr>\n				</tbody>\n			</table>\n			</td>\n		</tr>\n	</tbody>\n</table>', '1', '2022-05-10 00:00:00', '2022-05-10 00:00:00', NULL),
(1, 7, 1, 1, 'Order Placed | Retailer', 'Order Placed: {ORDER_ID}', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\r\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\r\n			<h2 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">{TITLE}</h2>\r\n			</div>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td>\r\n			<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width: 600px;margin: 0 auto;\" width=\"100%\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Order ID</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{ORDERID}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Product</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{PRODUCT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Category</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CATEGORY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Brand Name</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{BRAND}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Quantity</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{QUANTITY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Price</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">${PRICE} / {UNIT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Total</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{TOTAL}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:18px;padding-bottom: 8px;\">\r\n			<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #22a612;border-radius: 4px;\" width=\"210\"><a href=\"{LINK}\" style=\"text-decoration: none;outline: none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;\">GO TO ORDERS</a></td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>', '1', '2022-05-10 00:00:00', '2022-11-21 15:03:30', NULL);
INSERT INTO `email_template` (`isActive`, `id`, `headerId`, `footerId`, `title`, `subject`, `body`, `status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 8, 1, 1, 'Order Placed | Brand', 'New Order: {ORDER_ID}', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\r\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\r\n			<h2 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">{TITLE}</h2>\r\n			</div>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td>\r\n			<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width: 600px;margin: 0 auto;\" width=\"100%\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Order ID</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{ORDERID}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Product</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{PRODUCT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Category</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CATEGORY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Customer Name</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CUSTOMER}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Quantity</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{QUANTITY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Price</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">${PRICE}/{UNIT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Total</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{TOTAL}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:18px;padding-bottom: 8px;\">\r\n			<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #22a612;border-radius: 4px;\" width=\"210\"><a href=\"{LINK}\" style=\"text-decoration: none;outline: none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;\">GO TO ORDERS</a></td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>', '1', '2022-05-10 00:00:00', '2022-11-04 11:36:15', NULL),
(1, 9, 1, 1, 'Order Accepted | Retailer', 'Order Accepted: {ORDER_ID}', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\r\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\r\n			<h2 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">{TITLE}</h2>\r\n			</div>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td>\r\n			<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width: 600px;margin: 0 auto;\" width=\"100%\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Order ID</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{ORDERID}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Product</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{PRODUCT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Category</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CATEGORY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Brand Name</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{BRAND}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Quantity</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{QUANTITY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Price</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">${PRICE} / {UNIT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Total</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{TOTAL}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:18px;padding-bottom: 8px;\">\r\n			<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #22a612;border-radius: 4px;\" width=\"210\"><a href=\"{LINK}\" style=\"text-decoration: none;outline: none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;\">GO TO ORDERS</a></td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>', '1', '2022-05-10 00:00:00', '2022-11-04 11:36:40', NULL),
(1, 10, 1, 1, 'Order Accepted | Brand', 'Order Accepted: {ORDER_ID}', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\r\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\r\n			<h2 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">{TITLE}</h2>\r\n			</div>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td>\r\n			<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width: 600px;margin: 0 auto;\" width=\"100%\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Order ID</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{ORDERID}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Product</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{PRODUCT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Category</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CATEGORY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Customer Name</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CUSTOMER}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Quantity</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{QUANTITY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Price</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">${PRICE}/{UNIT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Total</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{TOTAL}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:18px;padding-bottom: 8px;\">\r\n			<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #22a612;border-radius: 4px;\" width=\"210\"><a href=\"{LINK}\" style=\"text-decoration: none;outline: none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;\">GO TO ORDERS</a></td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>', '1', '2022-05-10 00:00:00', '2022-11-04 11:37:04', NULL),
(1, 11, 1, 1, 'Order Cancelled | Retailer', 'Order Cancelled: {ORDER_ID}', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\r\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\r\n			<h2 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">{TITLE}</h2>\r\n			</div>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td>\r\n			<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width: 600px;margin: 0 auto;\" width=\"100%\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Order ID</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{ORDERID}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Product</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{PRODUCT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Category</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CATEGORY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Brand Name</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{BRAND}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Quantity</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{QUANTITY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Price</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">${PRICE} / {UNIT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Total</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{TOTAL}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:18px;padding-bottom: 8px;\">\r\n			<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #22a612;border-radius: 4px;\" width=\"210\"><a href=\"{LINK}\" style=\"text-decoration: none;outline: none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;\">GO TO ORDERS</a></td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>', '1', '2022-05-10 00:00:00', '2022-11-04 11:43:45', NULL);
INSERT INTO `email_template` (`isActive`, `id`, `headerId`, `footerId`, `title`, `subject`, `body`, `status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 12, 1, 1, 'Order Cancelled | Brand', 'Order Cancelled: {ORDER_ID}', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\r\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\r\n			<h2 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">{TITLE}</h2>\r\n			</div>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td>\r\n			<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width: 600px;margin: 0 auto;\" width=\"100%\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Order ID</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{ORDERID}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Product</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{PRODUCT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Category</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CATEGORY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Customer Name</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CUSTOMER}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Quantity</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{QUANTITY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Price</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">${PRICE} / {UNIT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Total</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{TOTAL}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:18px;padding-bottom: 8px;\">\r\n			<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #22a612;border-radius: 4px;\" width=\"210\"><a href=\"{LINK}\" style=\"text-decoration: none;outline: none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;\">GO TO ORDERS</a></td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>', '1', '2022-05-10 00:00:00', '2022-11-04 11:44:38', NULL),
(1, 13, 1, 1, 'Order Delivered | Retailer', 'Order Delivered: {ORDER_ID}', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\r\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\r\n			<h2 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">{TITLE}</h2>\r\n			</div>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td>\r\n			<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width: 600px;margin: 0 auto;\" width=\"100%\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Order ID</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{ORDERID}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Product</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{PRODUCT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Category</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CATEGORY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Brand Name</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{BRAND}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Quantity</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{QUANTITY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Price</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">${PRICE} / {UNIT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Total</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{TOTAL}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:18px;padding-bottom: 8px;\">\r\n			<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #22a612;border-radius: 4px;\" width=\"210\"><a href=\"{LINK}\" style=\"text-decoration: none;outline: none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;\">GO TO ORDERS</a></td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>', '1', '2022-05-10 00:00:00', '2022-11-04 11:45:12', NULL),
(1, 14, 1, 1, 'Order Delivered | Brand', 'Order Delivered: {ORDER_ID}', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\r\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\r\n			<h2 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">{TITLE}</h2>\r\n			</div>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td>\r\n			<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width: 600px;margin: 0 auto;\" width=\"100%\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Order ID</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{ORDERID}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Product</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{PRODUCT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Category</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CATEGORY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Customer Name</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CUSTOMER}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Quantity</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{QUANTITY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Price</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">${PRICE} / {UNIT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Total</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{TOTAL}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:18px;padding-bottom: 8px;\">\r\n			<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #22a612;border-radius: 4px;\" width=\"210\"><a href=\"{LINK}\" style=\"text-decoration: none;outline: none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;\">GO TO ORDERS</a></td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>', '1', '2022-05-10 00:00:00', '2022-11-04 11:45:44', NULL),
(1, 15, 1, 1, 'Order Received | Retailer', 'Order Received: {ORDER_ID}', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\r\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\r\n			<h2 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">{TITLE}</h2>\r\n			</div>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td>\r\n			<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width: 600px;margin: 0 auto;\" width=\"100%\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Order ID</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{ORDERID}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Product</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{PRODUCT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Category</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CATEGORY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Brand Name</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{BRAND}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Quantity</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{QUANTITY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<p>&nbsp;</p>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Price</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">${PRICE} / {UNIT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Total</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{TOTAL}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:18px;padding-bottom: 8px;\">\r\n			<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #22a612;border-radius: 4px;\" width=\"210\"><a href=\"{LINK}\" style=\"text-decoration: none;outline: none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;\">GO TO ORDERS</a></td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>', '1', '2022-05-10 00:00:00', '2022-11-04 11:46:09', NULL);
INSERT INTO `email_template` (`isActive`, `id`, `headerId`, `footerId`, `title`, `subject`, `body`, `status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 16, 1, 1, 'Order Received | Brand', 'Order Received: {ORDER_ID}', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\r\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\r\n			<h2 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">{TITLE}</h2>\r\n			</div>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td>\r\n			<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width: 600px;margin: 0 auto;\" width=\"100%\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Order ID</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{ORDERID}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Product</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{PRODUCT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Category</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CATEGORY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Customer Name</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CUSTOMER}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Quantity</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{QUANTITY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Price</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">${PRICE} / {UNIT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Total</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{TOTAL}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:18px;padding-bottom: 8px;\">\r\n			<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #22a612;border-radius: 4px;\" width=\"210\"><a href=\"{LINK}\" style=\"text-decoration: none;outline: none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;\">GO TO ORDERS</a></td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>', '1', '2022-05-10 00:00:00', '2022-11-04 11:47:19', NULL),
(1, 17, 1, 1, 'Order Completed | Retailer', 'Order Completed: {ORDER_ID}', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\r\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\r\n			<h2 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">{TITLE}</h2>\r\n			</div>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td>\r\n			<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width: 600px;margin: 0 auto;\" width=\"100%\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Order ID</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{ORDERID}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Product</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{PRODUCT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Category</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CATEGORY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Brand Name</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{BRAND}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Quantity</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{QUANTITY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Price</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">${PRICE} / {UNIT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Total</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{TOTAL}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:18px;padding-bottom: 8px;\">\r\n			<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #22a612;border-radius: 4px;\" width=\"210\"><a href=\"{LINK}\" style=\"text-decoration: none;outline: none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;\">GO TO ORDERS</a></td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>', '1', '2022-05-10 00:00:00', '2022-11-04 11:47:45', NULL),
(1, 18, 1, 1, 'Order Completed | Brand', 'Order Completed: {ORDER_ID}', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\r\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\r\n			<h2 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">{TITLE}</h2>\r\n			</div>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td>\r\n			<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width: 600px;margin: 0 auto;\" width=\"100%\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Order ID</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{ORDERID}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Product</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{PRODUCT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Category</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CATEGORY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Customer Name</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CUSTOMER}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Quantity</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{QUANTITY}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Price</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">${PRICE} / {UNIT}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\r\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\r\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Total</h4>\r\n						</div>\r\n						</div>\r\n\r\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\r\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\r\n\r\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\r\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{TOTAL}</p>\r\n						</div>\r\n						</div>\r\n						</td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:18px;padding-bottom: 8px;\">\r\n			<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n				<tbody>\r\n					<tr>\r\n						<td align=\"center\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #22a612;border-radius: 4px;\" width=\"210\"><a href=\"{LINK}\" style=\"text-decoration: none;outline: none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;\">GO TO ORDERS</a></td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>', '1', '2022-05-10 00:00:00', '2022-11-04 11:48:22', NULL),
(1, 19, 1, 1, 'Profile Approved', 'Your Profile has been approved', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n <tbody>\r\n <tr>\r\n <td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\r\n <div style=\"font-family: Arial, sans-serif, \'Open Sans\'; margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\r\n <h2 style=\"font-family: Arial, sans-serif, \'Open Sans\'; font-weight: bold;margin-top: 0px; margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">Congratulations! {NAME}</h2>\r\n <!-- <p style=\"margin-top: 0px;margin-bottom: 0px;\">That thus much less heron other hello</p> --></div>\r\n </td>\r\n </tr>\r\n </tbody>\r\n</table>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n <tbody>\r\n <tr>\r\n <td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top: 16px;padding-bottom: 16px;\">\r\n <div style=\"font-family: Arial, sans-serif, \'Open Sans\'; margin-top: 0px; margin-bottom: 0px; font-size: 14px; line-height: 24px; max-width: 584px; color: #424651; text-align: center;\">\r\n <p style=\"margin-top: 0px;margin-bottom: 0px;\">Your profile is verified by administrator.</p>\r\n\r\n <p style=\"margin-top: 0px;margin-bottom: 0px;\">You can now login <a href=\"{LINK}\" style=\"text-decoration: underline;\">here</a></p>\r\n <!--<p style=\"margin-top: 0px;margin-bottom: 0px;\">We look forward to welcoming you.</p>--></div>\r\n </td>\r\n </tr>\r\n </tbody>\r\n</table>', '1', '2021-02-01 01:27:51', '2022-03-10 07:03:58', NULL),
(1, 20, 1, 1, 'Quote Cancelled | Retailer', 'Quote Cancelled: {QUOTE_ID}', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n	<tbody>\n		<tr>\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\n			<h2 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">{TITLE}</h2>\n			</div>\n			</td>\n		</tr>\n	</tbody>\n</table>\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n	<tbody>\n		<tr>\n			<td>\n			<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width: 600px;margin: 0 auto;\" width=\"100%\">\n				<tbody>\n				    <tr>\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Quote ID</h4>\n						</div>\n						</div>\n\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{QUOTEID}</p>\n						</div>\n						</div>\n						</td>\n					</tr>\n					<tr>\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Brand Name</h4>\n						</div>\n						</div>\n\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{BRAND}</p>\n						</div>\n						</div>\n						</td>\n					</tr>\n				</tbody>\n			</table>\n			</td>\n		</tr>\n	</tbody>\n</table>\n\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n	<tbody>\n		<tr>\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:18px;padding-bottom: 8px;\">\n			<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n				<tbody>\n					<tr>\n						<td align=\"center\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #22a612;border-radius: 4px;\" width=\"210\"><a href=\"{LINK}\" style=\"text-decoration: none;outline: none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;\">GO TO QUOTE</a></td>\n					</tr>\n				</tbody>\n			</table>\n			</td>\n		</tr>\n	</tbody>\n</table>', '1', '2022-05-10 00:00:00', '2022-05-10 00:00:00', NULL),
(1, 21, 1, 1, 'Quote Cancelled | Brand', 'Quote Cancelled: {QUOTE_ID}', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n	<tbody>\n		<tr>\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">\n			<h2 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;\">{TITLE}</h2>\n			</div>\n			</td>\n		</tr>\n	</tbody>\n</table>\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n	<tbody>\n		<tr>\n			<td>\n			<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width: 600px;margin: 0 auto;\" width=\"100%\">\n				<tbody>\n				    <tr>\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Quote ID</h4>\n						</div>\n						</div>\n\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{QUOTEID}</p>\n						</div>\n						</div>\n						</td>\n					</tr>\n					<tr>\n						<td align=\"center\" style=\"font-size: 0;vertical-align: top;background-color: #ffffff;\">\n						<div style=\"display: inline-block;vertical-align: top;width: 30%;\">\n						<div style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #82899a;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<h4 style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 18px;line-height: 23px;\">Cutomer Name</h4>\n						</div>\n						</div>\n\n						<div style=\"display: inline-block;vertical-align: top;width: 70%;\">\n						<div class=\"o_hide-xs\" style=\"font-size: 16px; line-height: 16px; height: 16px;\">&nbsp;</div>\n\n						<div class=\"o_px-xs o_sans o_text o_text-secondary o_right o_xs-center\" data-color=\"Secondary\" data-max=\"20\" data-min=\"12\" data-size=\"Text Default\" style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;text-align: left;padding-left: 8px;padding-right: 8px;\">\n						<p class=\"o_mb-xxs\" style=\"margin-top: 0px;margin-bottom: 4px;\">{CUSTOMER}</p>\n						</div>\n						</div>\n						</td>\n					</tr>\n				</tbody>\n			</table>\n			</td>\n		</tr>\n	</tbody>\n</table>\n\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n	<tbody>\n		<tr>\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:18px;padding-bottom: 8px;\">\n			<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n				<tbody>\n					<tr>\n						<td align=\"center\" style=\"font-family: Arial, sans-serif, \'Open Sans\';font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #22a612;border-radius: 4px;\" width=\"210\"><a href=\"{LINK}\" style=\"text-decoration: none;outline: none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;\">GO TO QUOTE</a></td>\n					</tr>\n				</tbody>\n			</table>\n			</td>\n		</tr>\n	</tbody>\n</table>', '1', '2022-05-10 00:00:00', '2022-05-10 00:00:00', NULL),
(1, 22, 1, 1, 'Requested Quotes', 'Requested Quotes', '{QUOTE_DETAILS}', '1', '2022-05-10 00:00:00', '2022-05-10 00:00:00', NULL),
(1, 23, 1, 1, 'Unread Messages', 'Unread Messages', '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top:20px;padding-bottom:0px;\">\r\n			<div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;\">{MESSAGE}</div>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>', '1', '2022-11-10 07:52:00', '2022-11-10 07:52:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `email_template_footer`
--

CREATE TABLE `email_template_footer` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `status` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `email_template_footer`
--

INSERT INTO `email_template_footer` (`isActive`, `id`, `title`, `description`, `status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'Footer 1', '<!--footer-->\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n <tbody>\n <tr>\n <td style=\"font-size: 48px;line-height: 20px;height: 20px;background-color: #ffffff;\">&nbsp;</td>\n </tr>\n </tbody>\n</table>\n\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n <tbody>\n <tr>\n <td align=\"center\" style=\"background-color: #f2f2f2;padding-left: 16px;padding-right: 16px;padding-bottom: 23px;\">\n <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n <tbody>\n <tr>\n <td align=\"center\">\n <div style=\"font-size: 32px; line-height: 32px; height: 32px;\">&nbsp;</div>\n\n <div style=\"font-family: Arial, sans-serif, \'Open Sans\';margin-top: 9px;margin-bottom: 14px;font-size: 14px;line-height: 21px;color:#333;padding-left: 8px;padding-right: 8px;\">\n <p style=\"margin-top: 0px;margin-bottom: 8px;width: 100%;\">&copy; {COPYRIGHTYEAR} GMX. All Rights Reserved.</p>\n </div>\n </td>\n </tr>\n <tr>\n <td align=\"center\">\n\n </td>\n </tr>\n </tbody>\n </table>\n </td>\n </tr>\n </tbody>\n</table>\n<!--footer-->', 1, '2022-05-10 00:00:00', '2022-05-10 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `email_template_header`
--

CREATE TABLE `email_template_header` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `status` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `email_template_header`
--

INSERT INTO `email_template_header` (`isActive`, `id`, `title`, `description`, `status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'Header 1', '<title></title>\r\n<link href=\"https://fonts.googleapis.com/css?family=Open+Sans\" rel=\"stylesheet\" type=\"text/css\" />\r\n<style media=\"screen\" type=\"text/css\">[style*=\'Open Sans\'] {\r\n font-family: \'Open Sans\', Arial, sans-serif !important\r\n }\r\n</style>\r\n<div>\r\n<div><!--header-->\r\n<div>\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n	<tbody>\r\n		<tr>\r\n			<td align=\"center\" style=\"font-family: Arial, sans-serif, \'Open Sans\'; margin-top: 0px; margin-bottom: 0px; font-size: 14px; line-height: 24px; background-color:#f2f2f2; padding: 8px;\">\r\n			<p style=\"margin-top: 0px;margin-bottom: 0px;\"><a href=\"{BASE_URL}\" style=\"text-decoration: none;outline: none;color: #ffffff;\"><img alt=\"GMX\" src=\"https://assets.greenmarketexchange.com/settings/main-logo.png\" style=\"max-width:240px;-ms-interpolation-mode: bicubic;vertical-align: middle;border: 0;line-height: 100%; outline: none;text-decoration: none;\" /></a></p>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n</div>\r\n</div>\r\n</div>', 1, '2022-05-10 00:00:00', '2022-11-04 12:13:11', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `followingId` int DEFAULT NULL,
  `followerId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ioro`
--

CREATE TABLE `ioro` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ioro`
--

INSERT INTO `ioro` (`isActive`, `id`, `title`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'Indoor', '2022-05-11 04:18:47', '2022-05-11 04:18:47', NULL),
(1, 2, 'Outdoor', '2022-05-11 04:18:47', '2022-05-11 04:18:47', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `license_types`
--

CREATE TABLE `license_types` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `license_types`
--

INSERT INTO `license_types` (`isActive`, `id`, `title`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'Recreational', '2022-07-18 06:22:13', '2022-07-18 20:31:14', NULL),
(1, 2, 'Medical', '2022-07-18 06:22:13', '2022-07-18 20:31:26', NULL),
(1, 3, NULL, '2022-07-19 06:51:11', '2022-07-19 06:51:19', '2022-07-19 06:51:19'),
(1, 4, NULL, '2022-07-19 07:12:59', '2022-07-19 07:13:21', '2022-07-19 07:13:21');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `userId` int DEFAULT NULL,
  `postId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `med_rec`
--

CREATE TABLE `med_rec` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `med_rec`
--

INSERT INTO `med_rec` (`isActive`, `id`, `title`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'Medical', '2022-05-02 00:00:00', '2022-12-07 16:30:43', '2022-12-07 16:30:43'),
(1, 2, 'Recreational', '2022-05-04 00:00:00', '2022-05-04 00:00:00', NULL),
(1, 3, 'Med', '2022-05-04 00:00:00', '2022-11-21 15:27:23', '2022-11-21 15:27:23'),
(2, 4, 'Medical', '2022-06-10 01:30:19', '2022-06-10 01:30:26', '2022-10-04 00:00:00'),
(1, 5, 'Rec', '2022-10-26 22:45:40', '2022-11-21 15:27:26', '2022-11-21 15:27:26');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `fromId` int DEFAULT NULL,
  `toId` int DEFAULT NULL,
  `message` text,
  `attachment` enum('1','2') DEFAULT NULL COMMENT '1 for yes,2 for no',
  `fileType` varchar(255) DEFAULT NULL,
  `fileSize` varchar(255) DEFAULT NULL,
  `readStatus` enum('1','2') DEFAULT NULL COMMENT '1 for read, 2 for unread',
  `mailSend` enum('1','2') DEFAULT '2' COMMENT '1 for send, 2 for pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `brandId` int DEFAULT NULL,
  `retailerId` int DEFAULT NULL,
  `orderId` varchar(255) DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `amount` float(10,2) DEFAULT NULL,
  `total` float(10,2) DEFAULT NULL,
  `cancelledBy` int DEFAULT NULL,
  `cancelledAt` datetime DEFAULT NULL,
  `status` enum('1','2','3','4','5','6') DEFAULT NULL COMMENT '1 for Placed, 2 for Accepted, 3 for Cancelled, 4 for Delivered, 5 for Received, 6 for Completed',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`isActive`, `id`, `title`, `slug`, `price`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'Marketplace', 'popular', 0, 'Display and list your Products as a Brand', '2022-05-05 18:21:40', '2022-12-07 16:42:26', NULL),
(1, 2, 'Silver Plan', 'Silver Plan', 30, 'Silver Plan details here', '2022-06-29 12:11:53', '2022-07-04 15:01:36', '2022-07-04 15:01:36');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `userId` int DEFAULT NULL,
  `type` enum('1','2') DEFAULT '1' COMMENT '1 for post, 2 for repost',
  `repostId` int DEFAULT NULL,
  `post` text,
  `postUniqueId` varchar(255) DEFAULT NULL,
  `likeCount` int NOT NULL DEFAULT '0',
  `repostCount` int NOT NULL DEFAULT '0',
  `commentCount` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `userId` int DEFAULT NULL,
  `brandId` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `medRecId` int DEFAULT NULL,
  `price` float(10,2) DEFAULT NULL,
  `strainId` int DEFAULT NULL,
  `dominant` varchar(255) DEFAULT NULL,
  `iOId` int DEFAULT NULL,
  `harvested` datetime DEFAULT NULL,
  `thc` float(10,2) DEFAULT NULL,
  `flavor` varchar(255) DEFAULT NULL,
  `description` text,
  `labResultsPath` varchar(255) DEFAULT NULL,
  `avgProductRating` float(10,2) DEFAULT '0.00',
  `reviewsProductCount` int DEFAULT '0',
  `unit` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`isActive`, `id`, `userId`, `brandId`, `title`, `slug`, `categoryId`, `medRecId`, `price`, `strainId`, `dominant`, `iOId`, `harvested`, `thc`, `flavor`, `description`, `labResultsPath`, `avgProductRating`, `reviewsProductCount`, `unit`, `createdAt`, `updatedAt`) VALUES
(1, 1, 8, 1, 'Test', 'test', 17, 2, NULL, 5, '-', 1, '2022-11-26 00:00:00', 23.00, 'Blueberry', 'Test', '/products/product-lab-resultsc83c5092-9e99-4e45-86ec-57fb7974116c.pdf', 0.00, 0, '5 grams', '2022-12-20 01:03:53', '2022-12-20 01:03:53');

-- --------------------------------------------------------

--
-- Table structure for table `product_favourite`
--

CREATE TABLE `product_favourite` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `userId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `productId` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_price_history`
--

CREATE TABLE `product_price_history` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `productId` int DEFAULT NULL,
  `price` float(10,2) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_quotes`
--

CREATE TABLE `product_quotes` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `quoteId` varchar(255) DEFAULT NULL,
  `retailerId` int DEFAULT NULL,
  `brandId` int DEFAULT NULL,
  `totalQuantity` int DEFAULT NULL,
  `status` enum('1','2','3') DEFAULT NULL COMMENT '1 for Requested, 2 for Quoted, 3 for Cancelled',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_quotes`
--

INSERT INTO `product_quotes` (`isActive`, `id`, `quoteId`, `retailerId`, `brandId`, `totalQuantity`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 3, 'QT00000003', 9, 1, 1, '1', '2022-12-20 01:16:28', '2022-12-20 01:16:28');

-- --------------------------------------------------------

--
-- Table structure for table `product_quote_items`
--

CREATE TABLE `product_quote_items` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `productQuoteId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` float(10,2) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_quote_items`
--

INSERT INTO `product_quote_items` (`isActive`, `id`, `productQuoteId`, `productId`, `quantity`, `price`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 3, 3, 1, 1, NULL, '2022-12-20 01:16:28', '2022-12-20 01:16:28', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reposts`
--

CREATE TABLE `reposts` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `userId` int DEFAULT NULL,
  `postId` int DEFAULT NULL,
  `repostId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `productId` int DEFAULT NULL,
  `brandId` int DEFAULT NULL,
  `retailerId` int DEFAULT NULL,
  `type` enum('1','2','3') DEFAULT NULL COMMENT '1 for product, 2 for delivery on time, 3 for general',
  `ratings` float(10,2) DEFAULT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`isActive`, `id`, `name`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'info_email', 'info@greenmarketexchange.com', '2022-04-13 01:44:31', '2022-12-13 02:52:51', NULL),
(1, 2, 'contact_number', '2076913707', '2022-04-13 01:44:31', '2022-12-13 02:52:51', NULL),
(1, 3, 'site_address', 'https://greenmarketexchange.com/', '2022-04-13 01:44:31', '2022-12-13 02:52:51', NULL),
(1, 4, 'facebook_link', NULL, '2022-04-13 01:44:31', '2022-12-13 02:52:51', NULL),
(1, 5, 'instagram_link', NULL, '2022-04-13 01:44:31', '2022-12-13 02:52:51', NULL),
(1, 6, 'twitter_link', NULL, '2022-04-13 01:44:31', '2022-12-13 02:52:51', NULL),
(1, 7, 'linkedin_link', NULL, '2022-04-13 01:44:31', '2022-12-13 02:52:51', NULL),
(1, 8, 'logo', '/settings/main-logo.png', '2022-04-13 01:44:31', '2022-04-15 11:03:53', NULL),
(1, 9, 'footerlogo', '/settings/main-logo.png', '2022-04-13 01:49:30', '2022-04-15 10:23:42', NULL),
(1, 10, 'stripe_secret_key', 'sk_test_51M6k0gBMOPRi3AfhyM851Ahh1167JDjXxNmbPNOUSccvUNW2gvR17C5Yg5GirtAKW6fuYP2K3yTxDTootYoMxJwU00qQOTO0Ki', '2022-04-13 01:49:30', '2022-04-15 10:23:42', NULL),
(1, 11, 'recaptcha_key', '6LfphBgjAAAAAFSzjfFDQ6LW_PCuo9Qo3m0x71-H', '2022-06-02 09:35:32', '2022-06-02 09:35:32', NULL),
(1, 12, 'site_name', NULL, '2022-07-08 09:52:41', '2022-12-13 02:52:51', NULL),
(1, 13, 'minlogo', '/settings/min-logo.svg', '2022-04-13 01:44:31', '2022-04-15 11:03:53', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `state`
--

CREATE TABLE `state` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `state`
--

INSERT INTO `state` (`isActive`, `id`, `name`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'Alabama', '0000-00-00 00:00:00', '2022-12-07 16:41:20', '2022-12-07 16:41:20'),
(1, 2, 'New York', '0000-00-00 00:00:00', '2022-12-07 16:41:24', '2022-12-07 16:41:24'),
(1, 3, 'Florida', '0000-00-00 00:00:00', '2022-12-07 16:41:16', '2022-12-07 16:41:16'),
(1, 4, 'Maine', '2022-07-24 20:50:39', '2022-12-07 16:41:28', '2022-12-07 16:41:28'),
(1, 5, 'Massachusetts', '2022-09-26 21:04:18', '2022-09-26 21:04:35', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `strains`
--

CREATE TABLE `strains` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `strains`
--

INSERT INTO `strains` (`isActive`, `id`, `title`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'Indica', '2022-05-02 00:00:00', '2022-06-24 07:56:26', NULL),
(1, 2, 'Sativa', '2022-05-04 00:00:00', '2022-05-04 00:00:00', NULL),
(1, 3, 'Hybrid', '2022-05-04 00:00:00', '2022-05-04 00:00:00', '1900-01-03 00:00:00'),
(1, 4, NULL, '2022-06-24 07:59:24', '2022-06-24 07:59:28', '2022-06-24 07:59:28'),
(1, 5, 'Hyrbid', '2022-10-26 23:49:52', '2022-10-26 23:49:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `isApproved` enum('1','2') DEFAULT '1' COMMENT '1 for approved, 2 for unapproved',
  `role` enum('1','2','3') DEFAULT NULL COMMENT '1 for admin, 2 for brand, 3 for retailer',
  `businessName` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `brandName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `stateId` int DEFAULT NULL,
  `zipCode` int DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `licenseNumber` varchar(255) DEFAULT NULL,
  `medRecId` int DEFAULT NULL,
  `expirationDate` datetime DEFAULT NULL,
  `profilePath` varchar(255) DEFAULT NULL,
  `licensePath` varchar(255) DEFAULT NULL,
  `planId` int DEFAULT NULL,
  `planExpiryDate` datetime DEFAULT NULL,
  `subscriptionId` int DEFAULT NULL,
  `verification_token` varchar(255) DEFAULT NULL,
  `followersCount` int DEFAULT '0',
  `followingsCount` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`isActive`, `id`, `isApproved`, `role`, `businessName`, `slug`, `brandName`, `email`, `password`, `stateId`, `zipCode`, `phoneNumber`, `licenseNumber`, `medRecId`, `expirationDate`, `profilePath`, `licensePath`, `planId`, `planExpiryDate`, `subscriptionId`, `verification_token`, `followersCount`, `followingsCount`, `createdAt`, `updatedAt`) VALUES
(1, 1, '1', '3', 'Top Builder', 'top-builder', NULL, 'lalit.nyusoft@gmail.com', '$2a$10$auHh3SvUN.Hqp7YTEnjGUuwvLSF/sgtEy0sRj7cfr7tvn/jyuPavq', 5, 47605, '717', '543', 2, '2023-03-29 00:00:00', NULL, '/documents/license-9e9e6d45-1f87-4401-adf7-77216678cacc.pdf', NULL, NULL, NULL, NULL, 0, 0, '2022-12-19 07:20:47', '2022-12-19 07:20:47'),
(1, 8, '1', '2', 'Green Market Exchange', 'gmx', 'GMX', 'straka26@icloud.com', '$2a$10$rymNukpxNqjVxknuBYhp8e0q6RCX921me7BZ7lIIwVThVpYz7CbAm', 5, 4854, '6177357798', '34343433', 2, '2023-02-03 00:00:00', NULL, '/documents/license-f1a74103-7b08-4aa6-a753-aebd71273dbe.png', 1, '2022-12-20 00:00:00', 3, NULL, 0, 0, '2022-12-20 00:54:23', '2022-12-21 00:57:26'),
(1, 9, '1', '3', 'GMX test', 'gmx-test', NULL, 'christian.j.straka@gmail.com', '$2a$10$xfl9.tO.fk015oOgYswRNuB5BxrVkatqAUvbQwMolMTDfTLBtK1oi', 5, 4092, '2076913707', '45454', 2, '2022-12-27 00:00:00', NULL, '/documents/license-bc8f1995-7737-47b7-a758-b3032bd11346.png', NULL, NULL, NULL, NULL, 0, 0, '2022-12-20 01:05:16', '2022-12-20 01:05:16'),
(1, 12, '2', '2', 'Smit', 'top-buildera', 'Top BuilderA', 'smit.nyusoft@gmail.com', '$2a$10$HM.griwZY5Ycpn0hAkKY4.W7x..1XDA5w.M9j7h0mZdLre2QK4nKe', 5, 54545, '123456000', '45645456', 2, '2023-06-15 00:00:00', '/profile/profile-336d7d00-e57b-4d2e-a1e7-644560ff44ae.png', '/documents/license-83135f12-d7a6-4c4c-a941-5af26434a940.pdf', 1, '2022-12-22 00:00:00', 7, NULL, 0, 0, '2022-12-20 07:55:55', '2022-12-22 08:02:39'),
(1, 13, '2', '2', 'christian', 'test-2', 'Test 2', 'cstraka.gmx@gmail.com', '$2a$10$GJxSZr5q6nGifuBHHAUJvOre1DNK/eLvw7/JKBN7nDtDtH03c4/CO', 5, 4092, '2076913707', '123456', 2, '2022-12-30 00:00:00', NULL, '/documents/license-8b4fca8a-69e4-4f39-bee3-4d07cce39328.png', 1, '2022-12-22 00:00:00', 6, NULL, 0, 0, '2022-12-21 02:53:45', '2022-12-22 05:54:27');

-- --------------------------------------------------------

--
-- Table structure for table `user_subscription`
--

CREATE TABLE `user_subscription` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `userId` int DEFAULT NULL,
  `planId` int DEFAULT NULL,
  `customerId` varchar(255) DEFAULT NULL,
  `subscriptionToken` varchar(255) DEFAULT NULL,
  `subscriptionId` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `amount` varchar(255) DEFAULT NULL,
  `responseJson` text,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `planCancelDate` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_subscription`
--

INSERT INTO `user_subscription` (`isActive`, `id`, `userId`, `planId`, `customerId`, `subscriptionToken`, `subscriptionId`, `status`, `amount`, `responseJson`, `startDate`, `endDate`, `planCancelDate`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 8, 1, 'cus_N0vyvES8MRSn2n', 'tok_1MGu64BMOPRi3AfhmYQB9Dsy', 'sub_1MGu65BMOPRi3AfhiiE7qvuk', 'active', '2000', '{\"id\":\"sub_1MGu65BMOPRi3AfhiiE7qvuk\",\"object\":\"subscription\",\"application\":null,\"application_fee_percent\":null,\"automatic_tax\":{\"enabled\":false},\"billing_cycle_anchor\":1671497661,\"billing_thresholds\":null,\"cancel_at\":null,\"cancel_at_period_end\":false,\"canceled_at\":null,\"collection_method\":\"charge_automatically\",\"created\":1671497661,\"currency\":\"usd\",\"current_period_end\":1671584061,\"current_period_start\":1671497661,\"customer\":\"cus_N0vyvES8MRSn2n\",\"days_until_due\":null,\"default_payment_method\":null,\"default_source\":null,\"default_tax_rates\":[],\"description\":null,\"discount\":null,\"ended_at\":null,\"items\":{\"object\":\"list\",\"data\":[{\"id\":\"si_N0vyzNstIqUi3o\",\"object\":\"subscription_item\",\"billing_thresholds\":null,\"created\":1671497661,\"metadata\":{},\"plan\":{\"id\":\"1\",\"object\":\"plan\",\"active\":true,\"aggregate_usage\":null,\"amount\":9900,\"amount_decimal\":\"9900\",\"billing_scheme\":\"per_unit\",\"created\":1669194408,\"currency\":\"usd\",\"interval\":\"day\",\"interval_count\":1,\"livemode\":false,\"metadata\":{},\"nickname\":null,\"product\":\"prod_MqwoGaJkVA0dm1\",\"tiers_mode\":null,\"transform_usage\":null,\"trial_period_days\":null,\"usage_type\":\"licensed\"},\"price\":{\"id\":\"1\",\"object\":\"price\",\"active\":true,\"billing_scheme\":\"per_unit\",\"created\":1669194408,\"currency\":\"usd\",\"custom_unit_amount\":null,\"livemode\":false,\"lookup_key\":null,\"metadata\":{},\"nickname\":null,\"product\":\"prod_MqwoGaJkVA0dm1\",\"recurring\":{\"aggregate_usage\":null,\"interval\":\"day\",\"interval_count\":1,\"trial_period_days\":null,\"usage_type\":\"licensed\"},\"tax_behavior\":\"unspecified\",\"tiers_mode\":null,\"transform_quantity\":null,\"type\":\"recurring\",\"unit_amount\":9900,\"unit_amount_decimal\":\"9900\"},\"quantity\":1,\"subscription\":\"sub_1MGu65BMOPRi3AfhiiE7qvuk\",\"tax_rates\":[]}],\"has_more\":false,\"total_count\":1,\"url\":\"/v1/subscription_items?subscription=sub_1MGu65BMOPRi3AfhiiE7qvuk\"},\"latest_invoice\":\"in_1MGu65BMOPRi3Afh2ZHgqHwU\",\"livemode\":false,\"metadata\":{},\"next_pending_invoice_item_invoice\":null,\"on_behalf_of\":null,\"pause_collection\":null,\"payment_settings\":{\"payment_method_options\":null,\"payment_method_types\":null,\"save_default_payment_method\":\"off\"},\"pending_invoice_item_interval\":null,\"pending_setup_intent\":null,\"pending_update\":null,\"plan\":{\"id\":\"1\",\"object\":\"plan\",\"active\":true,\"aggregate_usage\":null,\"amount\":9900,\"amount_decimal\":\"9900\",\"billing_scheme\":\"per_unit\",\"created\":1669194408,\"currency\":\"usd\",\"interval\":\"day\",\"interval_count\":1,\"livemode\":false,\"metadata\":{},\"nickname\":null,\"product\":\"prod_MqwoGaJkVA0dm1\",\"tiers_mode\":null,\"transform_usage\":null,\"trial_period_days\":null,\"usage_type\":\"licensed\"},\"quantity\":1,\"schedule\":null,\"start_date\":1671497661,\"status\":\"active\",\"test_clock\":null,\"transfer_data\":null,\"trial_end\":null,\"trial_start\":null}', '2022-12-19 00:00:00', '2023-01-19 00:00:00', '', '2022-12-20 00:54:23', '2022-12-20 00:54:23', NULL),
(1, 2, 12, 1, 'cus_N12lQRrHIxkkQY', 'tok_1MH0g0BMOPRi3AfhpOIjDCf7', 'sub_1MH0g1BMOPRi3AfhI9j6Mjw1', 'active', '2000', '{\"id\":\"sub_1MH0g1BMOPRi3AfhI9j6Mjw1\",\"object\":\"subscription\",\"application\":null,\"application_fee_percent\":null,\"automatic_tax\":{\"enabled\":false},\"billing_cycle_anchor\":1671522953,\"billing_thresholds\":null,\"cancel_at\":null,\"cancel_at_period_end\":false,\"canceled_at\":null,\"collection_method\":\"charge_automatically\",\"created\":1671522953,\"currency\":\"usd\",\"current_period_end\":1671609353,\"current_period_start\":1671522953,\"customer\":\"cus_N12lQRrHIxkkQY\",\"days_until_due\":null,\"default_payment_method\":null,\"default_source\":null,\"default_tax_rates\":[],\"description\":null,\"discount\":null,\"ended_at\":null,\"items\":{\"object\":\"list\",\"data\":[{\"id\":\"si_N12lfmL13lUNKn\",\"object\":\"subscription_item\",\"billing_thresholds\":null,\"created\":1671522954,\"metadata\":{},\"plan\":{\"id\":\"1\",\"object\":\"plan\",\"active\":true,\"aggregate_usage\":null,\"amount\":9900,\"amount_decimal\":\"9900\",\"billing_scheme\":\"per_unit\",\"created\":1669194408,\"currency\":\"usd\",\"interval\":\"day\",\"interval_count\":1,\"livemode\":false,\"metadata\":{},\"nickname\":null,\"product\":\"prod_MqwoGaJkVA0dm1\",\"tiers_mode\":null,\"transform_usage\":null,\"trial_period_days\":null,\"usage_type\":\"licensed\"},\"price\":{\"id\":\"1\",\"object\":\"price\",\"active\":true,\"billing_scheme\":\"per_unit\",\"created\":1669194408,\"currency\":\"usd\",\"custom_unit_amount\":null,\"livemode\":false,\"lookup_key\":null,\"metadata\":{},\"nickname\":null,\"product\":\"prod_MqwoGaJkVA0dm1\",\"recurring\":{\"aggregate_usage\":null,\"interval\":\"day\",\"interval_count\":1,\"trial_period_days\":null,\"usage_type\":\"licensed\"},\"tax_behavior\":\"unspecified\",\"tiers_mode\":null,\"transform_quantity\":null,\"type\":\"recurring\",\"unit_amount\":9900,\"unit_amount_decimal\":\"9900\"},\"quantity\":1,\"subscription\":\"sub_1MH0g1BMOPRi3AfhI9j6Mjw1\",\"tax_rates\":[]}],\"has_more\":false,\"total_count\":1,\"url\":\"/v1/subscription_items?subscription=sub_1MH0g1BMOPRi3AfhI9j6Mjw1\"},\"latest_invoice\":\"in_1MH0g1BMOPRi3AfhKQ5DBVe0\",\"livemode\":false,\"metadata\":{},\"next_pending_invoice_item_invoice\":null,\"on_behalf_of\":null,\"pause_collection\":null,\"payment_settings\":{\"payment_method_options\":null,\"payment_method_types\":null,\"save_default_payment_method\":\"off\"},\"pending_invoice_item_interval\":null,\"pending_setup_intent\":null,\"pending_update\":null,\"plan\":{\"id\":\"1\",\"object\":\"plan\",\"active\":true,\"aggregate_usage\":null,\"amount\":9900,\"amount_decimal\":\"9900\",\"billing_scheme\":\"per_unit\",\"created\":1669194408,\"currency\":\"usd\",\"interval\":\"day\",\"interval_count\":1,\"livemode\":false,\"metadata\":{},\"nickname\":null,\"product\":\"prod_MqwoGaJkVA0dm1\",\"tiers_mode\":null,\"transform_usage\":null,\"trial_period_days\":null,\"usage_type\":\"licensed\"},\"quantity\":1,\"schedule\":null,\"start_date\":1671522953,\"status\":\"active\",\"test_clock\":null,\"transfer_data\":null,\"trial_end\":null,\"trial_start\":null}', '2022-12-20 00:00:00', '2023-01-20 00:00:00', '', '2022-12-20 07:55:55', '2022-12-20 07:55:55', NULL),
(1, 3, 8, 1, 'cus_N0vyvES8MRSn2n', 'tok_1MGu64BMOPRi3AfhmYQB9Dsy', 'sub_1MGu65BMOPRi3AfhiiE7qvuk', 'active', '99', NULL, '2022-12-20 00:00:00', '2022-12-20 00:00:00', NULL, '2022-12-21 00:57:26', '2022-12-21 00:57:26', NULL),
(1, 4, 13, 1, 'cus_N1L7P5vtLWoUDD', 'tok_1MHIR8BMOPRi3AfhIAE1Q1hB', 'sub_1MHIR9BMOPRi3AfhuNclK18F', 'active', '2000', '{\"id\":\"sub_1MHIR9BMOPRi3AfhuNclK18F\",\"object\":\"subscription\",\"application\":null,\"application_fee_percent\":null,\"automatic_tax\":{\"enabled\":false},\"billing_cycle_anchor\":1671591223,\"billing_thresholds\":null,\"cancel_at\":null,\"cancel_at_period_end\":false,\"canceled_at\":null,\"collection_method\":\"charge_automatically\",\"created\":1671591223,\"currency\":\"usd\",\"current_period_end\":1671677623,\"current_period_start\":1671591223,\"customer\":\"cus_N1L7P5vtLWoUDD\",\"days_until_due\":null,\"default_payment_method\":null,\"default_source\":null,\"default_tax_rates\":[],\"description\":null,\"discount\":null,\"ended_at\":null,\"items\":{\"object\":\"list\",\"data\":[{\"id\":\"si_N1L7fyOFFcKQs4\",\"object\":\"subscription_item\",\"billing_thresholds\":null,\"created\":1671591223,\"metadata\":{},\"plan\":{\"id\":\"1\",\"object\":\"plan\",\"active\":true,\"aggregate_usage\":null,\"amount\":9900,\"amount_decimal\":\"9900\",\"billing_scheme\":\"per_unit\",\"created\":1669194408,\"currency\":\"usd\",\"interval\":\"day\",\"interval_count\":1,\"livemode\":false,\"metadata\":{},\"nickname\":null,\"product\":\"prod_MqwoGaJkVA0dm1\",\"tiers_mode\":null,\"transform_usage\":null,\"trial_period_days\":null,\"usage_type\":\"licensed\"},\"price\":{\"id\":\"1\",\"object\":\"price\",\"active\":true,\"billing_scheme\":\"per_unit\",\"created\":1669194408,\"currency\":\"usd\",\"custom_unit_amount\":null,\"livemode\":false,\"lookup_key\":null,\"metadata\":{},\"nickname\":null,\"product\":\"prod_MqwoGaJkVA0dm1\",\"recurring\":{\"aggregate_usage\":null,\"interval\":\"day\",\"interval_count\":1,\"trial_period_days\":null,\"usage_type\":\"licensed\"},\"tax_behavior\":\"unspecified\",\"tiers_mode\":null,\"transform_quantity\":null,\"type\":\"recurring\",\"unit_amount\":9900,\"unit_amount_decimal\":\"9900\"},\"quantity\":1,\"subscription\":\"sub_1MHIR9BMOPRi3AfhuNclK18F\",\"tax_rates\":[]}],\"has_more\":false,\"total_count\":1,\"url\":\"/v1/subscription_items?subscription=sub_1MHIR9BMOPRi3AfhuNclK18F\"},\"latest_invoice\":\"in_1MHIR9BMOPRi3AfhHwF9WEpI\",\"livemode\":false,\"metadata\":{},\"next_pending_invoice_item_invoice\":null,\"on_behalf_of\":null,\"pause_collection\":null,\"payment_settings\":{\"payment_method_options\":null,\"payment_method_types\":null,\"save_default_payment_method\":\"off\"},\"pending_invoice_item_interval\":null,\"pending_setup_intent\":null,\"pending_update\":null,\"plan\":{\"id\":\"1\",\"object\":\"plan\",\"active\":true,\"aggregate_usage\":null,\"amount\":9900,\"amount_decimal\":\"9900\",\"billing_scheme\":\"per_unit\",\"created\":1669194408,\"currency\":\"usd\",\"interval\":\"day\",\"interval_count\":1,\"livemode\":false,\"metadata\":{},\"nickname\":null,\"product\":\"prod_MqwoGaJkVA0dm1\",\"tiers_mode\":null,\"transform_usage\":null,\"trial_period_days\":null,\"usage_type\":\"licensed\"},\"quantity\":1,\"schedule\":null,\"start_date\":1671591223,\"status\":\"active\",\"test_clock\":null,\"transfer_data\":null,\"trial_end\":null,\"trial_start\":null}', '2022-12-20 00:00:00', '2023-01-20 00:00:00', '', '2022-12-21 02:53:45', '2022-12-21 02:53:45', NULL),
(1, 5, 12, 1, 'cus_N12lQRrHIxkkQY', 'tok_1MH0g0BMOPRi3AfhpOIjDCf7', 'sub_1MH0g1BMOPRi3AfhI9j6Mjw1', 'active', '99', NULL, '2022-12-21 00:00:00', '2022-12-21 00:00:00', NULL, '2022-12-21 07:56:29', '2022-12-21 07:56:29', NULL),
(1, 6, 13, 1, 'cus_N1L7P5vtLWoUDD', 'tok_1MHIR8BMOPRi3AfhIAE1Q1hB', 'sub_1MHIR9BMOPRi3AfhuNclK18F', 'active', '99', NULL, '2022-12-22 00:00:00', '2022-12-22 00:00:00', NULL, '2022-12-22 05:54:27', '2022-12-22 05:54:27', NULL),
(1, 7, 12, 1, 'cus_N12lQRrHIxkkQY', 'tok_1MH0g0BMOPRi3AfhpOIjDCf7', 'sub_1MH0g1BMOPRi3AfhI9j6Mjw1', 'active', '99', NULL, '2022-12-22 00:00:00', '2022-12-22 00:00:00', NULL, '2022-12-22 08:02:39', '2022-12-22 08:02:39', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_tokens`
--

CREATE TABLE `user_tokens` (
  `isActive` tinyint(1) DEFAULT '1',
  `id` int NOT NULL,
  `userId` int DEFAULT NULL,
  `token` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `axis_point`
--
ALTER TABLE `axis_point`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brand_details`
--
ALTER TABLE `brand_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `retailerId` (`retailerId`),
  ADD KEY `brandId` (`brandId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cms`
--
ALTER TABLE `cms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `commentUniqueId` (`commentUniqueId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `comment_like`
--
ALTER TABLE `comment_like`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `commentId` (`commentId`);

--
-- Indexes for table `comment_replies`
--
ALTER TABLE `comment_replies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commentId` (`commentId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `email_template`
--
ALTER TABLE `email_template`
  ADD PRIMARY KEY (`id`),
  ADD KEY `headerId` (`headerId`),
  ADD KEY `footerId` (`footerId`);

--
-- Indexes for table `email_template_footer`
--
ALTER TABLE `email_template_footer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `email_template_header`
--
ALTER TABLE `email_template_header`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `followingId` (`followingId`),
  ADD KEY `followerId` (`followerId`);

--
-- Indexes for table `ioro`
--
ALTER TABLE `ioro`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `license_types`
--
ALTER TABLE `license_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `med_rec`
--
ALTER TABLE `med_rec`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fromId` (`fromId`),
  ADD KEY `toId` (`toId`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brandId` (`brandId`),
  ADD KEY `retailerId` (`retailerId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `postUniqueId` (`postUniqueId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `repostId` (`repostId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `userId` (`userId`),
  ADD KEY `brandId` (`brandId`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `medRecId` (`medRecId`),
  ADD KEY `strainId` (`strainId`),
  ADD KEY `iOId` (`iOId`);

--
-- Indexes for table `product_favourite`
--
ALTER TABLE `product_favourite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `product_price_history`
--
ALTER TABLE `product_price_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `product_quotes`
--
ALTER TABLE `product_quotes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `retailerId` (`retailerId`),
  ADD KEY `brandId` (`brandId`);

--
-- Indexes for table `product_quote_items`
--
ALTER TABLE `product_quote_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productQuoteId` (`productQuoteId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `reposts`
--
ALTER TABLE `reposts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `brandId` (`brandId`),
  ADD KEY `retailerId` (`retailerId`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `strains`
--
ALTER TABLE `strains`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `stateId` (`stateId`),
  ADD KEY `medRecId` (`medRecId`),
  ADD KEY `planId` (`planId`);

--
-- Indexes for table `user_subscription`
--
ALTER TABLE `user_subscription`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `planId` (`planId`);

--
-- Indexes for table `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attachments`
--
ALTER TABLE `attachments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `axis_point`
--
ALTER TABLE `axis_point`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `brand_details`
--
ALTER TABLE `brand_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `cms`
--
ALTER TABLE `cms`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comment_like`
--
ALTER TABLE `comment_like`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comment_replies`
--
ALTER TABLE `comment_replies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `email_template`
--
ALTER TABLE `email_template`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `email_template_footer`
--
ALTER TABLE `email_template_footer`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `email_template_header`
--
ALTER TABLE `email_template_header`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ioro`
--
ALTER TABLE `ioro`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `license_types`
--
ALTER TABLE `license_types`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `med_rec`
--
ALTER TABLE `med_rec`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product_favourite`
--
ALTER TABLE `product_favourite`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_price_history`
--
ALTER TABLE `product_price_history`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_quotes`
--
ALTER TABLE `product_quotes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product_quote_items`
--
ALTER TABLE `product_quote_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reposts`
--
ALTER TABLE `reposts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `strains`
--
ALTER TABLE `strains`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user_subscription`
--
ALTER TABLE `user_subscription`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_tokens`
--
ALTER TABLE `user_tokens`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `brand_details`
--
ALTER TABLE `brand_details`
  ADD CONSTRAINT `brand_details_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`retailerId`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`brandId`) REFERENCES `brand_details` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comment_like`
--
ALTER TABLE `comment_like`
  ADD CONSTRAINT `comment_like_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_like_ibfk_2` FOREIGN KEY (`commentId`) REFERENCES `comments` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `comment_replies`
--
ALTER TABLE `comment_replies`
  ADD CONSTRAINT `comment_replies_ibfk_1` FOREIGN KEY (`commentId`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_replies_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `email_template`
--
ALTER TABLE `email_template`
  ADD CONSTRAINT `email_template_ibfk_1` FOREIGN KEY (`headerId`) REFERENCES `email_template_header` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `email_template_ibfk_2` FOREIGN KEY (`footerId`) REFERENCES `email_template_footer` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`followingId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`followerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`fromId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`toId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`brandId`) REFERENCES `brand_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`retailerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`repostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`brandId`) REFERENCES `brand_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`medRecId`) REFERENCES `med_rec` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_5` FOREIGN KEY (`strainId`) REFERENCES `strains` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_6` FOREIGN KEY (`iOId`) REFERENCES `ioro` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `product_favourite`
--
ALTER TABLE `product_favourite`
  ADD CONSTRAINT `product_favourite_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_favourite_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_price_history`
--
ALTER TABLE `product_price_history`
  ADD CONSTRAINT `product_price_history_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_quotes`
--
ALTER TABLE `product_quotes`
  ADD CONSTRAINT `product_quotes_ibfk_1` FOREIGN KEY (`retailerId`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `product_quotes_ibfk_2` FOREIGN KEY (`brandId`) REFERENCES `brand_details` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `product_quote_items`
--
ALTER TABLE `product_quote_items`
  ADD CONSTRAINT `product_quote_items_ibfk_1` FOREIGN KEY (`productQuoteId`) REFERENCES `product_quotes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_quote_items_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reposts`
--
ALTER TABLE `reposts`
  ADD CONSTRAINT `reposts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reposts_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`brandId`) REFERENCES `brand_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`retailerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`stateId`) REFERENCES `state` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`medRecId`) REFERENCES `med_rec` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`planId`) REFERENCES `plans` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_subscription`
--
ALTER TABLE `user_subscription`
  ADD CONSTRAINT `user_subscription_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_subscription_ibfk_2` FOREIGN KEY (`planId`) REFERENCES `plans` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD CONSTRAINT `user_tokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
