api.post('products',{
    name: productName,
    price: finalPrice,
    description: productDescription,
    date: date,
    company_id: companyId,
    image: productImage,
    validate: productValidate,
    discount: productDiscount,
    is_active: 0,
  },{
    headers: {
      'Authorization': 'Bearer '+userToken
    }
  }).then(() => {

  }).catch(err => {
    Alert.alert(
      'Ops!',
      'Erro ao Cadastrar sua Promoção, Entre em contato com o Suporte.'
    )
  })