import * as React from 'react';
import { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Linking, 
TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Userterm() {
  const [font, setFont] = useState(0);
  async function handleIncreaseFont(){
    setFont(7);
  }

  async function handleDecreaseFont(){
    setFont(-1);
  }
  return (
    <View style={styles.tcContainer}>
    <ScrollView>
      <Text style={styles.tcT}>
      Informações Gerais
      </Text>
      <Text style={[styles.tcP, {fontSize: 10 + font}]}>
      A Presente Política de Privacidade contém informações a respeito do modo como tratamos, total ou parcialmente, de forma automatizada ou não, os dados pessoais dos usuários que acessam o aplicativo CompremaisAki. Seu objetivo é esclarecer os interessados acerca dos tipos de dados que são coletados, dos motivos da coleta e da forma como o usuário poderá atualizar, gerenciar ou excluir estas informações.
      </Text>
      <Text style={[styles.tcP, {fontSize: 10 + font}]}>
      O presente documento foi elaborado em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei 13.709/18) e o Marco Civil da Internet (Lei 12.965/14). Ainda, o documento poderá ser atualizado em decorrência de eventual atualização normativa, razão pela qual se convida o usuário a consultar periodicamente esta seção.
      </Text>
      <Text style={styles.tcT}>
      Coleta de dados do usuário
      </Text>
      <Text style={[styles.tcP, {fontSize: 10 + font}]}>
      A Política de Privacidade do aplicativo CompremaisAki inclui assegurar que seus dados pessoais não serão divulgados a terceiros para fins comerciais, ficando restritos à Prefeitura Municipal de Nova Santa Rita.
      </Text>
      <Text style={styles.tcT}>
      Quando e quais dados são coletados
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      Os dados pessoais do usuário são recolhidos pelo aplicativo CompraemaisAki das seguinte formas:
      </Text>


      <View style={{flexDirection: 'row'}}>
            <Text style={[styles.tcP, {fontSize: 12 + font}]}>{'\u2022'}</Text>
            <Text style={[styles.tcP, {flex: 1, paddingLeft: 5, fontSize: 12 + font}]}>Quando o usuário da empresa se cadastra no aplicativo: esses dados são os dados de identificação básicos de Razão Social, CNPJ, Ramo Empresarial, E-mail, Telefone, Endereço e Imagem da Empresa.</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
            <Text style={[styles.tcP, {fontSize: 12 + font}]}>{'\u2022'}</Text>
            <Text style={[styles.tcP, {flex: 1, paddingLeft: 5, fontSize: 12 + font}]}>Quando o usuário da empresa atualiza seus dados do aplicativo: neste caso o aplicativo pode solicitar os dados de Razão Social, CNPJ, Ramo Empresarial, E-mail, Telefone, Endereço e Imagem da Empresa.</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
            <Text style={[styles.tcP, {fontSize: 12 + font}]}>{'\u2022'}</Text>
            <Text style={[styles.tcP, {flex: 1, paddingLeft: 5, fontSize: 12 + font}]}>Quando um usuário acessa o aplicativo: neste caso o aplicativo pode coletar os dados de localização do usuário ou do local da ocorrência da solicitação, através do Google. Além disso, serão coletados todos os dados preenchidos nos formulários pelo usuário, referentes à cada tipo de serviço solicitado.</Text>
      </View>

      <Text style={styles.tcT}>
      Para que finalidades utilizamos os dados pessoais do usuário
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      Os dados pessoais do usuário coletados e armazenados pelo aplicativo CompremaisAki tem por finalidade:
      </Text>

      <View style={{flexDirection: 'row'}}>
            <Text style={[styles.tcP, {fontSize: 12 + font}]}>{'\u2022'}</Text>
            <Text style={[styles.tcP, {flex: 1, paddingLeft: 5, fontSize: 12 + font}]}>Identificar o usuário de modo a garantir que as solicitações sejam abertas corretamente;</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
            <Text style={[styles.tcP, {fontSize: 12 + font}]}>{'\u2022'}</Text>
            <Text style={[styles.tcP, {flex: 1, paddingLeft: 5, fontSize: 12 + font}]}>Facilitar e agilizar as compras de fornecedores de produtos e serviços com sede no Município de Nova Santa Rita;</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
            <Text style={[styles.tcP, {fontSize: 12 + font}]}>{'\u2022'}</Text>
            <Text style={[styles.tcP, {flex: 1, paddingLeft: 5, fontSize: 12 + font}]}>Permitir o acesso do usuário a determinados conteúdos do aplicativo, exclusivo para usuários cadastrados;</Text>
      </View>


      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      O tratamento de dados pessoais para finalidades não previstas nesta Política de Privacidade somente ocorrerá mediante comunicação prévia ao usuário, de modo que os direitos e obrigações aqui previstos permanecem aplicáveis.
      </Text>

      <Text style={styles.tcT}>
      Dados sensíveis
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      <Text style={{fontWeight: "bold"}}>Não</Text> serão coletados dados sensíveis dos usuários, assim entendidos aqueles definidos nos arts. 9º e 10 do RGDP e nos arts. 11 e seguintes da Lei de Proteção de Dados Pessoais. Assim, dentre outros, não haverá coleta dos seguintes casos:
      </Text>

      <View style={{flexDirection: 'row'}}>
            <Text style={[styles.tcP, {fontSize: 12 + font}]}>{'\u2022'}</Text>
            <Text style={[styles.tcP, {flex: 1, paddingLeft: 5, fontSize: 12 + font}]}>Dados que revelem a origem racial ou étnica, as opiniões políticas, as convicções religiosas ou filosóficas, ou a filiação sindical do usuário;</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
            <Text style={[styles.tcP, {fontSize: 12 + font}]}>{'\u2022'}</Text>
            <Text style={[styles.tcP, {flex: 1, paddingLeft: 5, fontSize: 12 + font}]}>Dados genéticos;</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
            <Text style={[styles.tcP, {fontSize: 12 + font}]}>{'\u2022'}</Text>
            <Text style={[styles.tcP, {flex: 1, paddingLeft: 5, fontSize: 12 + font}]}>Dados relativos à saúde do usuário;</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
            <Text style={[styles.tcP, {fontSize: 12 + font}]}>{'\u2022'}</Text>
            <Text style={[styles.tcP, {flex: 1, paddingLeft: 5, fontSize: 12 + font}]}>Dados relativos à vida sexual ou à orientação sexual do usuário;</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
            <Text style={[styles.tcP, {fontSize: 12 + font}]}>{'\u2022'}</Text>
            <Text style={[styles.tcP, {flex: 1, paddingLeft: 5, fontSize: 12 + font}]}>Dados relacionados a condenações penais ou a infrações ou com medidas de segurança conexas.</Text>
      </View>

      <Text style={styles.tcT}>
      Armazenamento de dados
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      Os dados de uma solicitação e do solicitante são armazenados em um servidor de domínio contratado pela PMNSR.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      O aplicativo CompremaisAki permite a recuperação de Login e Senha cuja senha de acesso tenha sido esquecida pelo usuário. Esse procedimento estará visível no aplicativo, e será acionado por meio do fornecimento do E-mail cadastrado pelo usuário.
      </Text>

      <Text style={styles.tcT}>
      Segurança dos dados pessoais armazenados
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      O aplicativo se compromete a aplicar as medidas técnicas e organizativas aptas a proteger os dados pessoais de acessos não autorizados e de situações de destruição, perda, alteração, comunicação ou difusão de tais dados.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      Os dados pessoais armazenados são tratados com confidencialidade, dentro dos limites legais. No entanto, podemos divulgar suas informações pessoais caso sejamos obrigados pela lei para fazê-lo ou se você violar nossos Termos de Serviço.    
      </Text>

      <Text style={styles.tcT}>
      Tempo de armazenamento dos dados
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      Os dados pessoais do usuário são armazenados pelo aplicativo, por tempo indeterminado e durante o período necessário para a prestação do serviço ou o cumprimento das finalidades previstas no presente documento e termo de uso, conforme o disposto no inciso I do artigo 15 da Lei 13.709/18.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      Os dados podem ser removidos ou inativados a pedido do usuário, excetuando os casos em que a lei oferecer outro tratamento.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      Ainda, os dados pessoais dos usuários apenas podem ser conservados após o término de seu tratamento nas seguintes hipóteses previstas no artigo 16 da referida lei:
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      I - cumprimento de obrigação legal ou regulatória pelo controlador;
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      II - estudo por órgão de pesquisa, garantida, sempre que possível, a anonimização dos dados pessoais;
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      III - transferência a terceiro, desde que respeitados os requisitos de tratamento de dados dispostos nesta Lei;
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      IV - uso exclusivo do controlador, vedado seu acesso por terceiro, e desde que inativados os dados.
      </Text>

      <Text style={styles.tcT}>
      Do tratamento dos dados pessoais
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
            <Text style={{fontWeight: "bold"}}>4.1. Do responsável pelo tratamento dos dados (data controller)</Text> 
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      O controlador, responsável pelo tratamento dos dados pessoais do usuário, é a pessoa física ou jurídica, a autoridade pública, a agência ou outro organismo que, individualmente ou em conjunto com outras, determina as finalidades e os meios de tratamento dos dados pessoais.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      Neste aplicativo, o responsável pelo tratamento dos dados pessoais coletados é a Secretaria de Indústria, Comércio e Desenvolvimento da Prefeitura Municipal de Nova Santa Rita e as solicitações abertas pelo aplicativo são tratadas pelos órgãos públicos municipais competentes, referentes a cada tipo de serviço solicitado. Tanto a secretaria quando os órgãos citados, são partes componentes da Prefeitura Municipal de São Paulo, que poderá ser contatada pela Central 156, Portal SP156, Praças de atendimento ou Descomplica SP.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
            <Text style={{fontWeight: "bold"}}>4.2. Do operador de dados subcontratado (data processor)</Text> 
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      O operador de dados subcontratado é a pessoa física ou jurídica, a autoridade pública, a agência ou outro organismo que trata os dados pessoais sob supervisão do responsável pelo tratamento dos dados do usuário.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      Informamos que a Empresa Hábil Informática, CNPJ 02.048.638/0001-28 não representa a entidade governamental da PMNSR – Prefeitura Municipal de Nova Santa Rita, estando isenta de qualquer movimento de abrangência que preconiza, sobretudo, a abertura das medidas possíveis dos dados constantes do aplicativo, atuando exclusivamente de maneira a viabilizar o adequado funcionamento do aplicativo em nuvem da plataforma.
      </Text>

      <Text style={styles.tcT}>
      Cancelamento de cadastro
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      No caso de cancelamento do cadastro, o registro dos dados fornecidos continua armazenado por tempo indeterminado.
      </Text>

      <Text style={styles.tcT}>
      Compartilhamento de dados
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      O compartilhamento de dados do usuário ocorre apenas nos casos essenciais para o atendimento das finalidades do aplicativo. Os dados não ficarão disponíveis publicamente para outros usuários fora da hipótese acima.
      </Text>
      
      <Text style={styles.tcT}>
      Dever de não fornecer dados a terceiros
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      Durante a utilização do aplicativo, a fim de resguardar e de proteger os direitos de terceiros, o usuário do aplicativo deverá fornecer somente seus dados pessoais e não os de terceiros. 
      </Text>

      <Text style={styles.tcT}>
      Cookies ou dados de navegação
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      Os cookies referem-se a arquivos de onde ficam armazenadas as informações relacionadas à navegação do usuário no aplicativo. Tais informações são relacionadas aos dados de acesso como local e horário de acesso e são armazenadas para que o servidor da plataforma possa lê-las posteriormente a fim de personalizar os serviços oferecidos.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      O usuário do aplicativo CompremaisAki manifesta conhecer e aceitar que pode ser utilizado um sistema de coleta de dados de navegação mediante à utilização de cookies.
      </Text>

      <Text style={styles.tcT}>
      Responsabilidade dos usuários no fornecimento de dados pessoais
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      Ao aceitar esta Política de Privacidade, você declara que todas as informações fornecidas ao aplicativo móvel CompremaisAki são verdadeiras, exatas, atuais e completas, pois é uma obrigação do usuário atualizá-las para manter a veracidade e a exatidão das informações. 
      </Text>

      <Text style={styles.tcT}>
      Alterações para essa política de privacidade
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      A presente versão desta Política de Privacidade foi atualizada pela última vez em 18 de junho de 2021. Reservamos o direito de modificar este documento a qualquer momento, então, é recomendável que o usuário revise-a com frequência.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      Diante da fusão ou venda do aplicativo à outra empresa, os dados dos usuários podem ser transferidas para os novos proprietários para que a permanência dos serviços oferecidos.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      Ao utilizar o serviço ou fornecer informações pessoais após eventuais modificações, o usuário demonstra sua concordância com as novas normas.
      </Text>

      <Text style={styles.tcT}>
      Consentimento
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      Ao utilizar os serviços e fornecer as informações pessoais na plataforma, o usuário está consentindo com a presente Política de Privacidade e ao cadastrar-se, manifesta conhecer e pode exercitar seus direitos de cancelar seu cadastro, acessar e atualizar seus dados pessoais e garante a veracidade das informações por ele disponibilizadas. 
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      O usuário tem direito de retirar o seu consentimento a qualquer tempo, para tanto deve entrar em contato através do email: ajuda@novasantarita.net.br.
      </Text>

      <Text style={styles.tcT}>
      Dúvidas, descumprimentos e denúncias de uso indevido
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      A competência para o conhecimento, processamento ou julgamento de qualquer feito judicial envolvendo a presente Política de Privacidade será do foro da comarca de Canoas, renunciando-se expressamente a qualquer outro foro, por mais privilegiado que seja. Para a solução de controvérsias decorrentes do presente instrumento será aplicado integralmente o Direito brasileiro.
      </Text>
      <Text style={[styles.tcP1, {fontSize: 12 + font}]}>
      Última atualização: 18 de Junho de 2021
      </Text>
    </ScrollView>

    <View style={styles.fontbtnRow}>
      <View style={styles.fontbtnCol}>
        <TouchableOpacity style={styles.fontBtn} onPress={handleDecreaseFont} >
          <MaterialCommunityIcons name="format-font-size-decrease" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.fontbtnCol}>
        <TouchableOpacity style={styles.fontBtn } onPress={handleIncreaseFont}>
          <MaterialCommunityIcons name="format-font-size-increase" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  tcP:{
    marginTop: 10,
    marginBottom: 10,
  },
  tcP1: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 12
  },
  tcT: {
    marginTop: 12,
    marginBottom: 12,
    fontSize: 13,
    fontWeight: 'bold'
  },
  tcI: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 11,
    paddingHorizontal: 16
  },

fontbtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fontbtnCol: {
    width: '50%',
    paddingHorizontal: 10,
    paddingTop: 7
  },
  fontBtn: {
    backgroundColor: '#119999',
    height: 45,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7
  },
  tcContainer:{
    marginTop:15,
    marginBottom:15,
    height: height * .7
  },
})