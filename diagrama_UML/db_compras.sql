-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: db_compras
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `compras`
--

DROP TABLE IF EXISTS `compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compras` (
  `codCompra` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idProduto` int NOT NULL,
  `tipoMovimento` enum('ENTRADA','SAIDA') NOT NULL,
  `quantidadeMovimentada` int NOT NULL,
  `precoUnitario` decimal(10,2) NOT NULL,
  `descontoAplicado` decimal(5,2) DEFAULT '0.00',
  `precoFinal` decimal(10,2) NOT NULL,
  `formaPagamento` enum('DEBITO','CREDITO','DINHEIRO') NOT NULL,
  `statusCompra` enum('PAGA','PENDENTE') NOT NULL,
  `dataCompra` date NOT NULL,
  PRIMARY KEY (`codCompra`),
  KEY `idUsuario` (`idUsuario`),
  KEY `idProduto` (`idProduto`),
  CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`codUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `compras_ibfk_2` FOREIGN KEY (`idProduto`) REFERENCES `produtos` (`codProduto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
INSERT INTO `compras` VALUES (1,1,1,'SAIDA',5,9.99,0.41,49.75,'DINHEIRO','PAGA','2026-08-11'),(2,10,20,'ENTRADA',10,4.99,0.00,49.90,'CREDITO','PENDENTE','2026-08-11'),(3,30,1,'ENTRADA',7,9.99,20.00,55.94,'DEBITO','PAGA','2026-08-28'),(4,9,13,'SAIDA',1,299.99,10.97,267.08,'DINHEIRO','PENDENTE','2026-08-11'),(5,3,2,'SAIDA',1,19.99,0.12,19.97,'DEBITO','PAGA','2026-08-11');
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `codProduto` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text,
  `categoria` varchar(50) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `desconto` decimal(5,2) DEFAULT NULL,
  `qtdeEstoque` int NOT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`codProduto`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Essence Mascara Lash Princess','The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.','beauty',9.99,10.48,101,'Essence','https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp'),(2,'Eyeshadow Palette with Mirror','The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it\'s convenient for on-the-go makeup application.','beauty',19.99,18.19,33,'Glamour Beauty','https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp'),(3,'Powder Canister','The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.','beauty',14.99,9.84,89,'Velvet Touch','https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp'),(4,'Red Lipstick','The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.','beauty',12.99,12.16,91,'Chic Cosmetics','https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp'),(5,'Red Nail Polish','The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.','beauty',8.99,11.44,79,'Nail Couture','https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp'),(6,'Calvin Klein CK One','CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It\'s a versatile fragrance suitable for everyday wear.','fragrances',49.99,1.89,29,'Calvin Klein','https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp'),(7,'Chanel Coco Noir Eau De','Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.','fragrances',129.99,16.51,58,'Chanel','https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp'),(8,'Dior J\'adore','J\'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.','fragrances',89.99,14.72,98,'Dior','https://cdn.dummyjson.com/product-images/fragrances/dior-j\'adore/thumbnail.webp'),(9,'Dolce Shine Eau de','Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It\'s a joyful and youthful scent.','fragrances',69.99,0.62,4,'Dolce & Gabbana','https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp'),(10,'Gucci Bloom Eau de','Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It\'s a modern and romantic scent.','fragrances',79.99,14.39,91,'Gucci','https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp'),(11,'Annibale Colombo Bed','The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.','furniture',1899.99,8.57,88,'Annibale Colombo','https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp'),(12,'Annibale Colombo Sofa','The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.','furniture',2499.99,14.40,60,'Annibale Colombo','https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp'),(13,'Bedside Table African Cherry','The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.','furniture',299.99,19.09,63,'Furniture Co.','https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/thumbnail.webp'),(14,'Knoll Saarinen Executive Conference Chair','The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.','furniture',499.99,2.01,26,'Knoll','https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp'),(15,'Wooden Bathroom Sink With Mirror','The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.','furniture',799.99,8.80,7,'Bath Trends','https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/thumbnail.webp'),(16,'Apple','Fresh and crisp apples, perfect for snacking or incorporating into various recipes.','groceries',1.99,12.62,8,NULL,'https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp'),(17,'Beef Steak','High-quality beef steak, great for grilling or cooking to your preferred level of doneness.','groceries',12.99,9.61,86,NULL,'https://cdn.dummyjson.com/product-images/groceries/beef-steak/thumbnail.webp'),(18,'Cat Food','Nutritious cat food formulated to meet the dietary needs of your feline friend.','groceries',8.99,9.58,46,NULL,'https://cdn.dummyjson.com/product-images/groceries/cat-food/thumbnail.webp'),(19,'Chicken Meat','Fresh and tender chicken meat, suitable for various culinary preparations.','groceries',9.99,13.70,97,NULL,'https://cdn.dummyjson.com/product-images/groceries/chicken-meat/thumbnail.webp'),(20,'Cooking Oil','Versatile cooking oil suitable for frying, sautéing, and various culinary applications.','groceries',4.99,9.33,20,NULL,'https://cdn.dummyjson.com/product-images/groceries/cooking-oil/thumbnail.webp'),(21,'Cucumber','Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.','groceries',1.49,0.16,84,NULL,'https://cdn.dummyjson.com/product-images/groceries/cucumber/thumbnail.webp'),(22,'Dog Food','Specially formulated dog food designed to provide essential nutrients for your canine companion.','groceries',10.99,10.27,71,NULL,'https://cdn.dummyjson.com/product-images/groceries/dog-food/thumbnail.webp'),(23,'Eggs','Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.','groceries',2.99,11.05,9,NULL,'https://cdn.dummyjson.com/product-images/groceries/eggs/thumbnail.webp'),(24,'Fish Steak','Quality fish steak, suitable for grilling, baking, or pan-searing.','groceries',14.99,4.23,74,NULL,'https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp'),(25,'Green Bell Pepper','Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.','groceries',1.29,0.16,33,NULL,'https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/thumbnail.webp'),(26,'Green Chili Pepper','Spicy green chili pepper, ideal for adding heat to your favorite recipes.','groceries',0.99,1.00,3,NULL,'https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/thumbnail.webp'),(27,'Honey Jar','Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.','groceries',6.99,14.40,34,NULL,'https://cdn.dummyjson.com/product-images/groceries/honey-jar/thumbnail.webp'),(28,'Ice Cream','Creamy and delicious ice cream, available in various flavors for a delightful treat.','groceries',5.49,8.69,27,NULL,'https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp'),(29,'Juice','Refreshing fruit juice, packed with vitamins and great for staying hydrated.','groceries',3.99,12.06,50,NULL,'https://cdn.dummyjson.com/product-images/groceries/juice/thumbnail.webp'),(30,'Kiwi','Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.','groceries',2.49,15.22,99,NULL,'https://cdn.dummyjson.com/product-images/groceries/kiwi/thumbnail.webp');
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `codUsuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `sobrenome` varchar(50) NOT NULL,
  `idade` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `endereco` varchar(150) DEFAULT NULL,
  `cidade` varchar(50) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`codUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Emily','Johnson',29,'emily.johnson@x.dummyjson.com','+81 965-431-3024','626 Main Street','Phoenix','Mississippi'),(2,'Michael','Williams',36,'michael.williams@x.dummyjson.com','+49 258-627-6644','385 Fifth Street','Houston','Alabama'),(3,'Sophia','Brown',43,'sophia.brown@x.dummyjson.com','+81 210-652-2785','1642 Ninth Street','Washington','Alabama'),(4,'James','Davis',46,'james.davis@x.dummyjson.com','+49 614-958-9364','238 Jefferson Street','Seattle','Pennsylvania'),(5,'Emma','Miller',31,'emma.miller@x.dummyjson.com','+91 759-776-1614','607 Fourth Street','Jacksonville','Colorado'),(6,'Olivia','Wilson',23,'olivia.wilson@x.dummyjson.com','+91 607-295-6448','547 First Street','Fort Worth','Tennessee'),(7,'Alexander','Jones',39,'alexander.jones@x.dummyjson.com','+61 260-824-4986','664 Maple Street','Indianapolis','Delaware'),(8,'Ava','Taylor',28,'ava.taylor@x.dummyjson.com','+1 458-853-7877','1197 First Street','Fort Worth','Rhode Island'),(9,'Ethan','Martinez',34,'ethan.martinez@x.dummyjson.com','+92 933-608-5081','466 Pine Street','San Antonio','Louisiana'),(10,'Isabella','Anderson',32,'isabella.anderson@x.dummyjson.com','+49 770-658-4885','1964 Oak Street','New York','Utah'),(11,'Liam','Garcia',30,'liam.garcia@x.dummyjson.com','+92 870-217-6201','576 Fifth Street','Denver','South Dakota'),(12,'Mia','Rodriguez',25,'mia.rodriguez@x.dummyjson.com','+49 989-461-8403','1627 Sixth Street','Jacksonville','West Virginia'),(13,'Noah','Hernandez',41,'noah.hernandez@x.dummyjson.com','+49 393-605-6968','1413 Maple Street','New York','North Dakota'),(14,'Charlotte','Lopez',37,'charlotte.lopez@x.dummyjson.com','+44 373-953-5028','208 Second Street','Columbus','Ohio'),(15,'William','Gonzalez',33,'william.gonzalez@x.dummyjson.com','+81 905-252-7319','31 Maple Street','San Jose','Utah'),(16,'Avery','Perez',26,'avery.perez@x.dummyjson.com','+61 731-431-3457','1125 First Street','Columbus','Iowa'),(17,'Evelyn','Sanchez',38,'evelyn.sanchez@x.dummyjson.com','+1 623-880-6871','1170 Lincoln Street','San Diego','Wyoming'),(18,'Logan','Torres',32,'logan.torres@x.dummyjson.com','+81 507-434-8733','907 Seventh Street','Columbus','Arkansas'),(19,'Abigail','Rivera',29,'abigail.rivera@x.dummyjson.com','+91 228-363-7806','996 Oak Street','Chicago','New Mexico'),(20,'Jackson','Evans',35,'jackson.evans@x.dummyjson.com','+44 468-628-6686','1873 Main Street','New York','Arkansas'),(21,'Madison','Collins',27,'madison.collins@x.dummyjson.com','+81 259-957-5711','1892 Lincoln Street','Philadelphia','New Jersey'),(22,'Elijah','Stewart',34,'elijah.stewart@x.dummyjson.com','+44 468-357-7872','1701 Eighth Street','Columbus','Illinois'),(23,'Chloe','Morales',40,'chloe.morales@x.dummyjson.com','+92 468-541-7133','401 Fourth Street','Dallas','New Jersey'),(24,'Mateo','Nguyen',31,'mateo.nguyen@x.dummyjson.com','+1 341-597-6694','1578 Fourth Street','Columbus','Missouri'),(25,'Harper','Kelly',28,'harper.kelly@x.dummyjson.com','+92 518-863-2863','1591 Adams Street','Philadelphia','New York'),(26,'Evelyn','Gonzalez',36,'evelyn.gonzalez@x.dummyjson.com','+61 708-508-4638','1065 Lincoln Street','Dallas','Maine'),(27,'Daniel','Cook',42,'daniel.cook@x.dummyjson.com','+44 254-761-6843','1163 Pine Street','Los Angeles','Nevada'),(28,'Lily','Lee',30,'lily.lee@x.dummyjson.com','+1 808-757-9867','1946 Oak Street','Phoenix','Massachusetts'),(29,'Henry','Hill',39,'henry.hill@x.dummyjson.com','+1 240-833-4680','1837 Maple Street','Indianapolis','Delaware'),(30,'Addison','Wright',33,'addison.wright@x.dummyjson.com','+1 514-384-3300','568 Tenth Street','San Francisco','Montana');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vw_produtos_criticos`
--

DROP TABLE IF EXISTS `vw_produtos_criticos`;
/*!50001 DROP VIEW IF EXISTS `vw_produtos_criticos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_produtos_criticos` AS SELECT 
 1 AS `codigo_produto`,
 1 AS `nome`,
 1 AS `categoria`,
 1 AS `quantidade_atual`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_volume_compras`
--

DROP TABLE IF EXISTS `vw_volume_compras`;
/*!50001 DROP VIEW IF EXISTS `vw_volume_compras`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_volume_compras` AS SELECT 
 1 AS `nome`,
 1 AS `quantidade_total_movimentada`,
 1 AS `valor_financeiro_movimentado`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vw_produtos_criticos`
--

/*!50001 DROP VIEW IF EXISTS `vw_produtos_criticos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_produtos_criticos` AS select `produtos`.`codProduto` AS `codigo_produto`,`produtos`.`nome` AS `nome`,`produtos`.`categoria` AS `categoria`,`produtos`.`qtdeEstoque` AS `quantidade_atual` from `produtos` where (`produtos`.`qtdeEstoque` < 10) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_volume_compras`
--

/*!50001 DROP VIEW IF EXISTS `vw_volume_compras`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_volume_compras` AS select `p`.`nome` AS `nome`,sum(`c`.`quantidadeMovimentada`) AS `quantidade_total_movimentada`,sum(`c`.`precoFinal`) AS `valor_financeiro_movimentado` from (`compras` `c` join `produtos` `p` on((`c`.`idProduto` = `p`.`codProduto`))) where (`c`.`tipoMovimento` = 'SAIDA') group by `p`.`codProduto`,`p`.`nome` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-11 16:40:53
