Stripe.setPublishableKey('pk_test_51IYPqfSCynaQHqorBw3Spydx1vl1N0df0KgAWXkQ37zVdtJioO4DsWYNr0PJ9uwoaBROyAx5d1mC2uptngcQtBgW004ntgTOdt');
var $form=$('#checkoutform');
$form.submit(function(event){
  $form.find('button').prop('disabled',true);
    
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-exp-month').val(),
        exp_year: $('#card-exp-year').val(),
        name: $('#card-name').val() 
      }, stripeResponseHandler);
      return false;
});
function stripeResponseHandler(status, response) {

    // Grab the form:
  
    if (response.error) { // Problem!
  
      // Show the errors on the form
      $('#charge-error').text(response.error.message);
      $('#charge-error').removeclass('hidden');
      
      $('button').prop('disabled', false); 
      
    } 
    else { // Token was created!
  
      // Get the token ID:
      var token = response.id;
  
      // Insert the token into the form so it gets submitted to the server:
      $form.append($('<input type="hidden" name="stripeToken" />').val(token));
  
      // Submit the form:
      $form.get(0).submit();
  
    }
  }