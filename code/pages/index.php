<!DOCTYPE html>
<html lang="en">
	
  <?php require "../fragments/head.php"; ?>

  <body data-class="com/views/HomePageView">

    <div class="container-narrow">

      <?php require "../fragments/header.php"; ?>

      <hr>

      <div class="jumbotron">
        <h3>Dump your JSON here:</h3>
        <form id="jsonForm" method="POST">
	        <div class="well well-large">
	        	<textarea id="jsonField"></textarea>
	        </div>
        </form>
        <div id="jsonErrorAlert" class="alert alert-error">
    		<b>Oh snap!</b> Your JSON is malformed, fix it.
		</div>
        <a id="createBtn" class="btn btn-large btn-success" href="javascript: void(0);">Make it!</a>
      </div>

      <hr>

      <div id="instructions" class="row-fluid marketing">
        <div class="span6">
          <h4>Subheading</h4>
          <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>

          <h4>Subheading</h4>
          <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>

          <h4>Subheading</h4>
          <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
        </div>

        <div class="span6">
          <h4>Subheading</h4>
          <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>

          <h4>Subheading</h4>
          <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>

          <h4>Subheading</h4>
          <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
        </div>
      </div>

      <hr>

      <?php require "../fragments/footer.php" ?>

    </div> <!-- /container -->

  </body>
</html>
