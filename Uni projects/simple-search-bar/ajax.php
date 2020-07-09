<?php

include __DIR__."/connect.php";

if (isset($_POST['databaseQuery'])) {

   $sDatabaseSearch = $_POST['databaseQuery'];
//Search query.
   $Query = "SELECT title FROM search_items WHERE title LIKE '$sDatabaseSearch%'";
//Query execution
   $ExecQuery = MySQLi_query($con, $Query);


   echo '<ul>';
   //Fetching result from the database.
   while ($Result = MySQLi_fetch_array($ExecQuery)) {

       ?>

   <!-- Calling javascript function named as "fill" found in "script.js" file.-->
   <li onclick='fill("<?php echo $Result['title']; ?>")'>
   <a>
       <?php echo $Result['title']; ?>
   </a>
   </li>

   <?php }} ?>
</ul>
