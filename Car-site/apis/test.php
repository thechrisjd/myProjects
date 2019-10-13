<?php
include "../CRUD/connect.php";

if (isset($_POST['databaseQuery'])) {

   $sDatabaseSearch = $_POST['databaseQuery'];
//Search query.
   $stmt = $db->prepare('SELECT * FROM `airports` WHERE `airport_name` LIKE :Query');
   $stmt->bindValue(':Query', "$sDatabaseSearch%");
   $stmt->execute();
   $aRows = $stmt->fetchAll();
   //echo "string";
   //var_dump($aRows);
    echo '<ul>';
   foreach ($aRows as $jRow) {
     // code...

     ?>
     <li onclick='fill("<?php echo $jRow->airport_name; ?>")'>
     <a>
         <?php echo $jRow->airport_name; ?>
     </a>
     </li>

<?php
   }



}
?>
</ul>
