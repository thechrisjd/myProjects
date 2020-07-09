$('input').removeClass('invalid')
$('form').submit(function(){
  //console.log("Validating")

  let bErros = 0;
  $(this).find('input[data-validate=yes]').each(function(){
    $(this).removeClass('invalid')

    let sDataType = $(this).attr('data-type')
    switch (sDataType) {
      case "string":
        //console.log('Validating a string')
        let iMinLength = $(this).attr('data-min')
        let iMaxLength = $(this).attr('data-max')

        if ($(this).val().length < iMinLength || $(this).val().length > iMaxLength) {
          $(this).addClass('invalid')
          bErros = 1
        }
        break

      case "integer":
        //console.log('Validating an integer')
        let iMinNumber = Number($(this).attr('data-min'))
        let iMaxNumber = Number($(this).attr('data-max'))
        if ($(this).val() < iMinNumber || $(this).val() > iMaxNumber) {
          $(this).addClass('invalid')
          bErros = 1
        }
        break

        case "email":
          //console.log('Validating an email')
          function validateEmail(email) {
              var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return re.test(String(email).toLowerCase());
          }
          let sEmail = $(this).val()
          console.log(validateEmail(sEmail))
          if (validateEmail(sEmail) == false) {
            $(this).addClass('invalid')
            bErros = 1
          }

          break

      default:
      console.log('Sorry dont know how to validate')

    }
  })
  if (bErros == false) {
    return true
  }
})
