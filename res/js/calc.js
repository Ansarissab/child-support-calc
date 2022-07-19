(

  function($) {

    var frmParent = $('#calc');

  $.fn.doCalc = function(e){
    if (frmParent.find('select[name=residence1] option:selected').val() == '-1')
    {
      alert('Please select Residence');
      $frmParent.find('input[name=residence1]').focus();
      return false;
    }
    if (frmParent.find('input[name=income1]').val() == '')
    {
      alert('Please enter income');
      frmParent.find('input[name=income1]').focus();
      return false;
    }
    if (frmParent.find('select[name=cscchildren] option:selected').val() == '-1')
    {
      alert('Please select Number of children');
      frmParent.find('input[name=cscchildren]').focus();
      return false;
    }

  frmParent.find('input:text').each(function() {
      $(this).attr('value', $(this).val());
  });

  var iframeWin = document.getElementById("calculatorFrame").contentWindow
  iframeWin.postMessage(["submitData", frmParent.find('input, select').serialize()], "*");
  window.addEventListener('message', function(result) { $(this).showResults(result.data); }, false);

//    var data = frmParent.serialize();

//    data = 'url=https://mpi.childsupportcalculator.ca/calc.php&method=post&params=' + encodeURIComponent(data);
//alert(data);
    var btnSubmit = $(this).find('input[type=submit]');
    var btnValue = $(btnSubmit).val();
    frmParent.find('#calc_result').html('Please wait...');
    frmParent.find('#calc_result').css('visibility', 'visible')
    frmParent.find('#calc_result').css('display', '');
    frmParent.find('#calc_result').css('height', 'auto');
    $(btnSubmit).attr('disabled', true);

  };

  $.fn.showResults = function(result){
    json = JSON.parse(result);
    var frmParent = $('#calc');
    var btnSubmit = frmParent.find('input[type=submit]');
    if (json.childsupport['@monthly_child_support'] == false)
    {
      alert('An error occured while calculating.');
      //$(btnSubmit).val(btnValue);
      frmParent.find('#calc_result').html('');
      $(btnSubmit).attr('disabled', false);
      return false;
    }
    frmParent.find('#calc_result').html('The child support amount would be <span>$' + json.childsupport['@monthly_child_support'] + '</span> a month.');
    //frmParent.find('#calc_notice').html('Use this calculator to calculate your payments amounts.');
    $(btnSubmit).attr('disabled', false);
  };

  $('#calc').bind('submit', function(e){
    $(this).doCalc(e);
    return false;
  });

  //$('.frmCalc').bind('submit', function(e){
  //  $(this).doCalc(e);
  //  return false;
  //});
})(jQuery);