(function() {

// Localize jQuery variable
var jQuery;

/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else {
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
} else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    ecalc_main();
}

/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    // Call our main function
    ecalc_main();
}

/******** Our main function ********/
function ecalc_main() {
    jQuery(document).ready(function($) {
        /******* Load CSS *******/
        var css_link = $("<link>", {
            rel: "stylesheet",
            type: "text/css",
            href: "res/css/calcembed.css"
        });
        css_link.appendTo('head');

        /******* Load HTML *******/
        var calchtml = "<div class=calc_container><h6><a href=https:\/\/www.childsupportcalculator.ca\/ >Child Support Calculator<\/a><br\/>for Alberta<\/h6><hr><div><form id=ecalc><div><div><label>Payor Income<\/label><input type=number placeholder=80,000 name=income1><\/div><div><label>Number of Children<\/label><select name=cscchildren><option selected value=-1>\u2013Select\u2013<option value=1>1<option value=2>2<option value=3>3<option value=4>4<option value=5>5<option value=6>6+<\/select><\/div><\/div><input type=hidden name=residence1 value=\"Alberta\"><input type=hidden name=spousal value=no><input type=hidden name=haschildren value=yes><div id=ecalc_result style=display:none><\/div><div><input type=submit value=Calculate*><\/div><p>*By using this child support calculator, you agree with the <a href=https:\/\/www.childsupportcalculator.ca\/#terms target=new>calculator terms of use<\/a><\/form><iframe id=ecalculatorFrame style=display:none src=https:\/\/support-calculator.herokuapp.com\/calculatorFrame><\/iframe><\/div><\/div>"
        $('#child-support-calculator').html(calchtml);
        (

  function($) {

  var frmParent = $('#ecalc');

  $.fn.doECalc = function(e){
    if (frmParent.find('select[name=residence1] option:selected').val() == '-1')
    {
      alert('Please select Residence');
      frmParent.find('input[name=residence1]').focus();
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

//calculator functions
  var iframeWin = document.getElementById("ecalculatorFrame").contentWindow
  iframeWin.postMessage(["submitData", $('input, select').serialize()], "*");
  window.addEventListener('message', function(result) { $(this).showEResults(result.data); }, false);

//    var data = frmParent.serialize();

//    data = 'url=https://mpi.childsupportcalculator.ca/calc.php&method=post&params=' + encodeURIComponent(data);
//alert(data);
    var btnSubmit = $(this).find('input[type=submit]');
    var btnValue = $(btnSubmit).val();
    frmParent.find('#ecalc_result').html('Please wait...');
    frmParent.find('#ecalc_result').css('visibility', 'visible')
    frmParent.find('#ecalc_result').css('display', '');
    frmParent.find('#ecalc_result').css('height', 'auto');
    $(btnSubmit).attr('disabled', true);

  };

  $.fn.showEResults = function(result){
    json = JSON.parse(result);
    var frmParent = $('#ecalc');
    var btnSubmit = $(frmParent).find('input[type=submit]');
    if (json.childsupport['@monthly_child_support'] == false)
    {
      alert('An error occured while calculating.');
      //$(btnSubmit).val(btnValue);
      frmParent.find('#ecalc_result').html('');
      $(btnSubmit).attr('disabled', false);
      return false;
    }
    frmParent.find('#ecalc_result').html('The child support amount would be <span>$' + json.childsupport['@monthly_child_support'] + '</span> a month.');
    //frmParent.find('#calc_notice').html('Use this calculator to calculate your payments amounts.');
    $(btnSubmit).attr('disabled', false);
  };

  $('#ecalc').bind('submit', function(e){
    $(this).doECalc(e);
    return false;
  });

  //$('.frmCalc').bind('submit', function(e){
  //  $(this).doCalc(e);
  //  return false;
  //});
})(jQuery);
    });
}

})(); // We call our anonymous function immediately