<html>
<body>

<!--
<form action="contact-form.php" method="post">
  <label for="name">Your name:</label>
  <input type="text" id="name" name="customer_name" required>
  <br>
  <label for="email">Your email:</label>
  <input type="email" id="email" name="customer_email" required>
  <br>
  <label for="tel">Your telephone:</label>
  <input type="tel" id="tel" name="customer_tel" required>
  <br>
  <label for="message">Your message:</label>
  <textarea id="message" name="customer_message"required></textarea>
  <br>
  <button type="submit">Contact Me</button>
</form>
-->

<?php
// define variables and set to empty values
$customer_name = "";
$error_name = "";
$customer_email = "";
$error_email = "";
$customer_tel = "";
$error_tel = "";
$customer_message = "";
$error_message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["customer_name"])) {
    $error_name = "It's great to hear from you, but who am I speaking with?";
  } else {
    $customer_name = test_input($_POST["customer_name"]);
  }

  if (empty($_POST["customer_email"])) {
    $error_email = "Please provide me with an email address so I can return your message.";
  } else {
    $customer_email = test_input($_POST["customer_email"]);
  }

  if (empty($_POST["customer_tel"])) {
    $error_tel = "Please provide me with a telephone number to call you back.";
  } else {
    $customer_tel = test_input($_POST["customer_tel"]);
  }

  if (empty($_POST["customer_message"])) {
    $error_message = "What did you want to say?";
  } else {
    $customer_message = test_input($_POST["customer_message"]);
  }
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>

</body>
</html>