const EMPTY = { //NO input values
    'Roll-up': '',


    'Drill Down': "SELECT <br>"+
                  "   YEAR(o.order_approved_at) as 'Year', <br>" +
                  "   c.customer_state as 'State', c.customer_city as 'City', <br>" +
                  "   count(o.order_id) as 'Number of orders' <br>" +
                  "FROM	<br>" +
                  "   order_customers c <br>" +
                  "INNER JOIN order_items i ON c.customer_id = i.customer_id <br>" + 
                  "INNER JOIN orders o ON o.order_id = i.order_id <br>" + 
                  "GROUP BY <br>" +
                  "   YEAR(o.order_approved_at), <br>" +
                  "   c.customer_state, <br>" +
                  "   c.customer_city WITH ROLLUP <br>" +
                  "UNION ( <br>" +  
                  "SELECT null, c.customer_state as 'State', c.customer_city as 'City', count(o.order_id) as 'Number of orders' <br>" + 
                  "FROM order_customers c <br>" +
                  "INNER JOIN order_items i ON c.customer_id = i.customer_id <br>" +
	              "INNER JOIN orders o ON o.order_id = i.order_id <br>" +
	              "GROUP BY c.customer_state, c.customer_city WITH ROLLUP) <br>" +
                  "UNION ( <br>" + 
	              "SELECT  YEAR(o.order_approved_at) as 'Year', null, c.customer_city as 'City',  count(o.order_id) as 'Number of orders' <br>" +
	              "FROM order_customers c <br>" +
	              "INNER JOIN order_items i ON c.customer_id = i.customer_id <br>" +
	              "INNER JOIN orders o ON o.order_id = i.order_id <br>" +
	              "GROUP BY YEAR(o.order_approved_at), c.customer_city WITH ROLLUP)  <br>" +
                  "UNION ( <br>" +  
	              "SELECT null,	null, c.customer_city as 'City', count(o.order_id) as 'Number of orders' <br>" +
                  "FROM order_customers c <br>" +
                  "INNER JOIN order_items i ON c.customer_id = i.customer_id <br>" +
	              "INNER JOIN orders o ON o.order_id = i.order_id <br>" +
	              "GROUP BY c.customer_city WITH ROLLUP) <br>" +
                  "ORDER BY Year DESC, State DESC, City DESC; <br>",
        'Dice': "SELECT oc.customer_state as 'State', YEAR(o.order_approved_at) as 'Year ordered', MONTH(o.order_approved_at) as 'Month ordered', count(o.order_approved_at) as 'Number of orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN order_customers oc <br> " +
        "ON oi.customer_id = oc.customer_id <br> " +
        "JOIN orders o <br> " +
        "ON oi.order_id = o.order_id <br> " +
        "GROUP BY oc.customer_state, YEAR(o.order_approved_at), MONTH(o.order_approved_at) <br> " +
        "UNION ALL <br> " +
        "SELECT oc.customer_state as 'State', YEAR(o.order_approved_at) as 'Year ordered', null, count(o.order_approved_at) as 'Number of orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN order_customers oc <br> " +
        "ON oi.customer_id = oc.customer_id <br> " +
        "JOIN orders o <br> " +
        "ON oi.order_id = o.order_id <br> " +
        "GROUP BY oc.customer_state, YEAR(o.order_approved_at) <br> " +
        "UNION ALL <br> " +
        "SELECT oc.customer_state as 'State', null, MONTH(o.order_approved_at) as 'Month ordered', count(o.order_approved_at) as 'Number of orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN order_customers oc <br> " +
        "ON oi.customer_id = oc.customer_id <br> " +
        "JOIN orders o;",
    'Slice': "SELECT YEAR(o.order_approved_at) as 'Year', MONTH(o.order_approved_at) as 'Month', p.product_category_name_english as 'Category', COUNT(o.order_approved_at) as 'Total orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN orders o <br> " +
        "ON oi.order_id = o.order_id <br> " +
        "JOIN products p <br> " +
        "ON oi.product_id = p.product_id <br> " +
        "GROUP BY YEAR(o.order_approved_at), MONTH(o.order_approved_at), p.product_category_name_english <br> " +
        "UNION ALL <br> " +
        "SELECT YEAR(o.order_approved_at) as 'Year', MONTH(o.order_approved_at) as 'Month', null, COUNT(o.order_approved_at) as 'Total orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN orders o <br> " +
        "ON oi.order_id = o.order_id <br> " +
        "JOIN products p <br> " +
        "ON oi.product_id = p.product_id <br> " +
        "GROUP BY YEAR(o.order_approved_at), MONTH(o.order_approved_at) <br> " +
        "UNION ALL <br> " +
        "SELECT YEAR(o.order_approved_at) as 'Year', null, p.product_category_name_english as 'Category', COUNT(o.order_approved_at) as 'Total orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN orders o <br> " +
        "ON oi.order_id = o.order_id <br> " +
        "JOIN products p <br> " +
        "ON oi.product_id = p.product_id <br> " +
        "GROUP BY YEAR(o.order_approved_at), p.product_category_name_english <br> " +
        "UNION ALL <br> " +
        "SELECT null, MONTH(o.order_approved_at) as 'Month', p.product_category_name_english as 'Category', COUNT(o.order_approved_at) as 'Total orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN orders o <br> " +
        "ON oi.order_id = o.order_id <br> " +
        "JOIN products p <br> " +
        "ON oi.product_id = p.product_id <br> " +
        "GROUP BY MONTH(o.order_approved_at), p.product_category_name_english <br> " +
        "UNION ALL <br> " +
        "SELECT YEAR(o.order_approved_at) as 'Year', null, null, COUNT(o.order_approved_at) as 'Total orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN orders o <br> " +
        "ON oi.order_id = o.order_id <br> " +
        "JOIN products p <br> " +
        "ON oi.product_id = p.product_id <br> " +
        "GROUP BY YEAR(o.order_approved_at) <br> " +
        "UNION ALL <br> " +
        "SELECT null, null, p.product_category_name_english as 'Category', COUNT(o.order_approved_at) as 'Total orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN orders o <br> " +
        "ON oi.order_id = o.order_id <br> " +
        "JOIN products p <br> " +
        "ON oi.product_id = p.product_id <br> " +
        "GROUP BY p.product_category_name_english <br> " +
        "UNION ALL <br> " +
        "SELECT null, MONTH(o.order_approved_at) as 'Month', null, COUNT(o.order_approved_at) as 'Total orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN orders o <br> " +
        "ON oi.order_id = o.order_id <br> " +
        "JOIN products p <br> " +
        "ON oi.product_id = p.product_id <br> " +
        "GROUP BY MONTH(o.order_approved_at) <br> " +
        "UNION ALL <br> " +
        "SELECT null, null, null, COUNT(o.order_approved_at) as 'Total orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN orders o <br> " +
        "ON oi.order_id = o.order_id <br> " +
        "JOIN products p <br> " +
        "ON oi.product_id = p.product_id;"
}

const INPUT = { //with input values
    'Roll-up': "",
    'Drill Down': "SELECT count(o.order_id) as 'Number of orders',c.customer_city as 'City', DAY(o.order_approved_at) as Month <br> " +
        "FROM customers c <br> " +
        "INNER JOIN orders o  <br> " +
        "ON c.customer_id = o.customer_id <br> " +
        "WHERE YEAR(o.order_approved_at) = YEAR_VAL and  MONTH(o.order_approved_at) = MONTH_VAL <br> " +
        "GROUP BY CUBE(c.customer_city, DAY(o.order_approved_at)) <br> " +
        "ORDER BY count(o.order_id) desc <br> " +
        "LIMIT 5; <br> ",
    "Dice": "SELECT oc.customer_state as 'State', YEAR(o.order_approved_at) as 'Year ordered', MONTH(o.order_approved_at) as 'Month ordered', count(o.order_approved_at) as 'Number of orders' <br>" +
        "FROM order_items oi <br>" +
        "JOIN order_customers oc <br>" +
        "ON oi.customer_id = oc.customer_id <br>" +
        "JOIN orders o <br>" +
        "ON oi.order_id = o.order_id <br>" +
        "WHERE (oc.customer_state = STATE_VAL ) AND (YEAR(o.order_approved_at) = YEAR_VAL) AND (MONTH(o.order_approved_at) = MONTH_VAL) <br>" +
        "GROUP BY oc.customer_state, YEAR(o.order_approved_at), MONTH(o.order_approved_at) <br>" +
        "UNION ALL <br>" +
        "SELECT oc.customer_state as 'State', YEAR(o.order_approved_at) as 'Year ordered', null, count(o.order_approved_at) as 'Number of orders' <br>" +
        "FROM order_items oi <br>" +
        "JOIN order_customers oc <br>" +
        "ON oi.customer_id = oc.customer_id <br>" +
        "JOIN orders o <br>" +
        "ON oi.order_id = o.order_id <br>" +
        "WHERE (oc.customer_state = STATE_VAL ) AND (YEAR(o.order_approved_at) = YEAR_VAL) AND (MONTH(o.order_approved_at) = MONTH_VAL) <br>" +
        "GROUP BY oc.customer_state, YEAR(o.order_approved_at) <br>" +
        "UNION ALL <br>" +
        "SELECT oc.customer_state as 'State', null, MONTH(o.order_approved_at) as 'Month ordered', count(o.order_approved_at) as 'Number of orders' <br>" +
        "FROM order_items oi <br>" +
        "JOIN order_customers oc <br>" +
        "ON oi.customer_id = oc.customer_id <br>" +
        "JOIN orders o <br>" +
        "ON oi.order_id = o.order_id <br>" +
        "WHERE (oc.customer_state = STATE_VAL ) AND (YEAR(o.order_approved_at) = YEAR_VAL) AND (MONTH(o.order_approved_at) = MONTH_VAL) <br>" +
        "GROUP BY oc.customer_state, MONTH(o.order_approved_at) <br>" +
        "UNION ALL <br>" +
        "SELECT null, YEAR(o.order_approved_at) as 'Year ordered', MONTH(o.order_approved_at) as 'Month ordered', count(o.order_approved_at) as 'Number of orders' <br>" +
        "FROM order_items oi <br>" +
        "JOIN order_customers oc <br>" +
        "ON oi.customer_id = oc.customer_id <br>" +
        "JOIN orders o <br>" +
        "ON oi.order_id = o.order_id <br>" +
        "WHERE (oc.customer_state = STATE_VAL ) AND (YEAR(o.order_approved_at) = YEAR_VAL) AND (MONTH(o.order_approved_at) = MONTH_VAL) <br>" +
        "GROUP BY YEAR(o.order_approved_at), MONTH(o.order_approved_at) <br>" +
        "UNION ALL <br>" +
        "SELECT oc.customer_state as 'State', null, null, count(o.order_approved_at) as 'Number of orders' <br>" +
        "FROM order_items oi <br>" +
        "JOIN order_customers oc <br>" +
        "ON oi.customer_id = oc.customer_id <br>" +
        "JOIN orders o <br>" +
        "ON oi.order_id = o.order_id <br>" +
        "WHERE (oc.customer_state = STATE_VAL ) AND (YEAR(o.order_approved_at) = YEAR_VAL) AND (MONTH(o.order_approved_at) = MONTH_VAL) <br>" +
        "GROUP BY oc.customer_state <br>" +
        "UNION ALL <br>" +
        "SELECT null, null, MONTH(o.order_approved_at) as 'Month ordered', count(o.order_approved_at) as 'Number of orders' <br>" +
        "FROM order_items oi <br>" +
        "JOIN order_customers oc <br>" +
        "ON oi.customer_id = oc.customer_id <br>" +
        "JOIN orders o <br>" +
        "ON oi.order_id = o.order_id <br>" +
        "WHERE (oc.customer_state = STATE_VAL ) AND (YEAR(o.order_approved_at) = YEAR_VAL) AND (MONTH(o.order_approved_at) = MONTH_VAL) <br>" +
        "GROUP BY MONTH(o.order_approved_at) <br>" +
        "UNION ALL <br>" +
        "SELECT null, YEAR(o.order_approved_at) as 'Year ordered', null, count(o.order_approved_at) as 'Number of orders' <br>" +
        "FROM order_items oi <br>" +
        "JOIN order_customers oc <br>" +
        "ON oi.customer_id = oc.customer_id <br>" +
        "JOIN orders o <br>" +
        "ON oi.order_id = o.order_id <br>" +
        "WHERE (oc.customer_state = STATE_VAL ) AND (YEAR(o.order_approved_at) = YEAR_VAL) AND (MONTH(o.order_approved_at) = MONTH_VAL) <br>" +
        "GROUP BY YEAR(o.order_approved_at) <br>" +
        "UNION ALL <br>" +
        "SELECT null, null, null, count(o.order_approved_at) as 'Number of orders' <br>" +
        "FROM order_items oi <br>" +
        "JOIN order_customers oc <br>" +
        "ON oi.customer_id = oc.customer_id <br>" +
        "JOIN orders o <br>" +
        "ON oi.order_id = o.order_id <br>" +
        "WHERE (oc.customer_state = STATE_VAL ) AND (YEAR(o.order_approved_at) = YEAR_VAL) AND (MONTH(o.order_approved_at) = MONTH_VAL); <br>",
    "Slice": "SELECT YEAR(o.order_approved_at) as 'Year', MONTH(o.order_approved_at) as 'Month', p.product_category_name_english as 'Category', COUNT(o.order_approved_at) as 'Total orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN orders o <br> " +
        "ON oi.order_id = o.order_id <br> " +
        "JOIN products p <br> " +
        "ON oi.product_id = p.product_id <br> " +
        "WHERE YEAR(o.order_approved_at) = YEAR_VAL <br> " +
        "GROUP BY YEAR(o.order_approved_at), MONTH(o.order_approved_at), p.product_category_name_english <br> " +
        "UNION ALL <br> " +
        "SELECT YEAR(o.order_approved_at) as 'Year', MONTH(o.order_approved_at) as 'Month', null, COUNT(o.order_approved_at) as 'Total orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN orders o <br> " +
        "ON oi.order_id = o.order_id <br> " +
        "JOIN products p <br> " +
        "ON oi.product_id = p.product_id <br> " +
        "WHERE YEAR(o.order_approved_at) = YEAR_VAL <br> " +
        "GROUP BY YEAR(o.order_approved_at), MONTH(o.order_approved_at) <br> " +
        "UNION ALL <br> " +
        "SELECT YEAR(o.order_approved_at) as 'Year', null, p.product_category_name_english as 'Category', COUNT(o.order_approved_at) as 'Total orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN orders o <br> " +
        "ON oi.order_id = o.order_id <br> " +
        "JOIN products p <br> " +
        "ON oi.product_id = p.product_id <br> " +
        "WHERE YEAR(o.order_approved_at) = YEAR_VAL <br> " +
        "GROUP BY YEAR(o.order_approved_at), p.product_category_name_english <br> " +
        "UNION ALL <br> " +
        "SELECT null, MONTH(o.order_approved_at) as 'Month', p.product_category_name_english as 'Category', COUNT(o.order_approved_at) as 'Total orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN orders o <br> " +
        "ON oi.order_id = o.order_id <br> " +
        "JOIN products p <br> " +
        "ON oi.product_id = p.product_id <br> " +
        "WHERE YEAR(o.order_approved_at) = YEAR_VAL <br> " +
        "GROUP BY MONTH(o.order_approved_at), p.product_category_name_english <br> " +
        "UNION ALL <br> " +
        "SELECT YEAR(o.order_approved_at) as 'Year', null, null, COUNT(o.order_approved_at) as 'Total orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN orders o <br> " +
        "ON oi.order_id = o.order_id <br> " +
        "JOIN products p <br> " +
        "ON oi.product_id = p.product_id <br> " +
        "WHERE YEAR(o.order_approved_at) = YEAR_VAL <br> " +
        "GROUP BY YEAR(o.order_approved_at) <br> " +
        "UNION ALL <br> " +
        "SELECT null, null, p.product_category_name_english as 'Category', COUNT(o.order_approved_at) as 'Total orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN orders o <br> " +
        "ON oi.order_id = o.order_id <br> " +
        "JOIN products p <br> " +
        "ON oi.product_id = p.product_id <br> " +
        "WHERE YEAR(o.order_approved_at) = YEAR_VAL <br> " +
        "GROUP BY p.product_category_name_english <br> " +
        "UNION ALL <br> " +
        "SELECT null, MONTH(o.order_approved_at) as 'Month', null, COUNT(o.order_approved_at) as 'Total orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN orders o <br> " +
        "ON oi.order_id = o.order_id <br> " +
        "JOIN products p <br> " +
        "ON oi.product_id = p.product_id <br> " +
        "WHERE YEAR(o.order_approved_at) = YEAR_VAL <br> " +
        "GROUP BY MONTH(o.order_approved_at) <br> " +
        "UNION ALL <br> " +
        "SELECT null, null, null, COUNT(o.order_approved_at) as 'Total orders' <br> " +
        "FROM order_items oi <br> " +
        "JOIN orders o <br> " +
        "ON oi.order_id = o.order_id <br> " +
        "JOIN products p <br> " +
        "ON oi.product_id = p.product_id <br> " +
        "WHERE YEAR(o.order_approved_at) = YEAR_VAL;"

}