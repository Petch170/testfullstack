-- 4.1 SELECT store Region East
SELECT * FROM STORE
WHERE Region ="East";

-- 4.2 select product sell in store New York
SELECT STORE.City,PRODUCT.Description,PRODUCT.Brand
FROM SALES_FACT
INNER JOIN STORE ON SALES_FACT.Store_key=STORE.Store_key
INNER JOIN PRODUCT ON SALES_FACT.Product_Key=PRODUCT.Product_key
WHERE STORE.City = 'New York';


-- 4.3 sum profit in store new york
SELECT STORE.City,SUM(SALES_FACT.Profit) AS TotalProfit FROM SALES_FACT
INNER JOIN STORE ON SALES_FACT.Store_key=STORE.Store_key
INNER JOIN PRODUCT ON SALES_FACT.Product_Key=PRODUCT.Product_key
WHERE STORE.City = 'New York';

-- 4.4 delete product brand Wolf in sale_fact
DELETE FROM SALES_FACT
WHERE Product_key IN(
SELECT Product_key 
FROM PRODUCT
WHERE Brand ='Wolf');

-- 4.5 update product brand with the description 'toy story' to 'W' brand
-- INSERT INTO SALES_FACT(store_key,Product_key,Sales,Cost,Profit)
-- VALUES('1','2','16.7','6.91','9.79'),('3','2','7.16','2.75','4.4');
UPDATE PRODUCT
SET Brand = 'W'
WHERE Description = 'Toy Story';