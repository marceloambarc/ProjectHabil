import * as React from 'react';
import { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Linking, 
TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Userterm() {
  const [font, setFont] = useState(0);
  async function handleIncreaseFont(){
    setFont(3);
  }

  async function handleDecreaseFont(){
    setFont(-1);
  }
  return (
    <View style={styles.tcContainer}>
    <ScrollView>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
A HABIL SOLUÇÕES EM INFORMÁTICA, escrita no CNPJ 02.048.638/0001-28, com sede em Canoas –
RS, doravante denominada unicamente de <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text>, estabelece o presente 
instrumento, denominado <Text style={{fontWeight: "bold"}}>TERMOS DE USO</Text> que permite aos usuários possuidores 
de <Text style={{fontWeight: "bold"}}>CONTA</Text> no Aplicativo ou site <Text style={{fontWeight: "bold"}}>(CompreMaisAki)</Text> criarem contas para anuncio de suas 
empresas <Text style={{fontWeight: "bold"}}>(APPS)</Text> das plataformas Android, iOS, HTML5 para o uso de outros Usuários 
<Text style={{fontWeight: "bold"}}>(USUÁRIOS FINAIS)</Text> através de seus <Text style={{fontWeight: "bold"}}>SERVIÇOS DE DIVULGAÇÂO das Marcas de suas empresas, 
e divulgação de seus produtos e Promoções.</Text>
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
Por este <Text style={{fontWeight: "bold"}}>TERMO DE USO</Text>, o USUÁRIO EMPREENDEDOR (Usuário que cadastra a empresa com os 
dados da empresa) do APP COMPREMAISAKI fica ciente e concorda que ao utilizar o APP 
COMPREMAISAKI para construir, desenvolver e publicar seu <Text style={{fontWeight: "bold"}}>APP</Text>, em qualquer plataforma de 
celular ou qualquer loja de aplicativos, automaticamente aderirá e concordará em se submeter 
integralmente às condições do presente <Text style={{fontWeight: "bold"}}>TERMO DE USO</Text> e qualquer de suas alterações futuras.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
A <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> se reserva no direito de atualizar e modificar os <Text style={{fontWeight: "bold"}}>TERMOS DE 
USO</Text> periodicamente, sem notificar a sua base de o USUÁRIOS EMPREENDEDORES. Quaisquer 
novos recursos que aumentem ou aprimorem os <Text style={{fontWeight: "bold"}}>SERVIÇOS</Text> atuais, incluindo a liberação ou 
exclusão de novas ferramentas e funcionalidades, estarão sujeitos aos <Text style={{fontWeight: "bold"}}>TERMOS DE USO.</Text> O uso 
continuado do SERVIÇO após qualquer alteração constituirá anuências às referidas mudanças. 
O USUÁRIO EMPREENDEDOR poderá rever
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O USUÁRIO EMPREENDEDOR declara que está consciente de que a violação de qualquer das 
disposições estipuladas neste instrumento poderá resultar no cancelamento de 
sua <Text style={{fontWeight: "bold"}}>CONTA (“CONTA”)</Text> sem qualquer notificação, de modo que o USUÁRIO EMPREENDEDOR 
ficará impossibilitado de criar <Text style={{fontWeight: "bold"}}>APPS</Text>, bem como poderá resultar na exclusão do <Text style={{fontWeight: "bold"}}>APPS</Text> do APP 
COMPREMAISAKI e das lojas onde o APP poderá ter sido disponibilizado (Apple App Store e 
Google Play), conjuntamente com todo seu conteúdo e sua base de dados.
      </Text>
      <Text style={styles.tcT}>
        Nossas Responsabilidades
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
Quando permitido por lei, a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> e seus fornecedores ou distribuidores não se 
responsabilizarão por perda de lucros, perda de faturamento (receita), perda de dados e 
informações, perdas financeiras ou por danos indiretos, especiais, consequenciais, exemplares 
ou punitivos
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
Na medida permitida pela legislação, a responsabilidade total do APP COMPREMAISAKI e de 
seus fornecedores e distribuidores, para qualquer reclamação sob estes termos, incluindo 
quaisquer garantias implícitas, limita-se ao valor que você pagou, à <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> para 
usar os <Text style={{fontWeight: "bold"}}>SERVIÇOS</Text>. Fica a nosso critério se forneceremos os <Text style={{fontWeight: "bold"}}>SERVIÇOS</Text> a você novamente.
Em todos os casos, a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> e seus fornecedores e distribuidores não serão 
responsáveis por qualquer perda ou dano que não seja razoavelmente previsível.
      </Text>
      <Text style={styles.tcT}>
        Conteúdo
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
Conteúdo inclui texto, programas, scripts, gráficos, fotos, sons, imagens, músicas, vídeos, 
combinações audiovisuais, animações, recursos interativos e outros materiais que O(S) 
USUÁRIO(S) EMPREENDEDOR(ES) e o(s) Anunciante(s), têm acesso ou submetem a um <Text style={{fontWeight: "bold"}}>APP.</Text>
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O USUÁRIO EMPREENDEDOR é o proprietário do conteúdo que publica nos <Text style={{fontWeight: "bold"}}>APP's</Text> construídos
na <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text>. O USUÁRIO EMPREENDEDOR declara ter conhecimento de que a 
responsabilidade pelo conteúdo inserido nos <Text style={{fontWeight: "bold"}}>APPS</Text> é exclusiva do USUÁRIO EMPREENDEDOR 
que a publicar, entende e concorda que a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> não pode ser responsável pelo 
conteúdo postado ou compartilhado no <Text style={{fontWeight: "bold"}}>SERVIÇO</Text>.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
A <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> proíbe a utilização ou transmissão de conteúdos impróprios 
nos <Text style={{fontWeight: "bold"}}>APPS</Text> criados na <Text style={{fontWeight: "bold"}}>APLICATIVOS PARA CELULAR</Text>, conforme listado abaixo, mas não se
limitando a:
      </Text>
      <Text style={styles.tcI}>
1.  Vírus ou outros códigos maliciosos como worms, spywares ou códigos destrutivos
      </Text>
      <Text style={styles.tcI}>
2.  Publicações que visam intimidar, assediar ou praticar bullying contra qualquer tipo de 
usuário do Aplicativo.
      </Text>
      <Text style={styles.tcI}>
3.  Discurso de ódio, seja ameaçador; incite violência; ou contenha violência gráfica ou 
desnecessária. Discursos de ódio ou qualquer
      </Text>
      <Text style={styles.tcI}>
4.  Conteúdos e discursos discriminatórios que infrinjam o Artigo 5º, inciso XLI, da 
Constituição Federal.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O USUÁRIO EMPREENDEDOR concorda ainda em usar o <Text style={{fontWeight: "bold"}}>SERVIÇO</Text> por sua própria conta e risco. 
A <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> não será responsável por quaisquer danos diretos, indiretos, incidentais, 
especiais, consequenciais ou exemplares, incluindo, mas não limitado, a danos por perda de 
lucros, boa vontade, uso, dados ou outras perdas intangíveis, em decorrência da utilização 
imprópria de tais conteúdos.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
Todas as infrações relativas a direitos de propriedade intelectual dos conteúdos publicados e 
compartilhados nos <Text style={{fontWeight: "bold"}}>APPS</Text> são de exclusiva responsabilidade do USUÁRIO EMPREENDEDOR que 
o publicar, não podendo a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> em hipótese alguma ser responsabilizada pelo 
uso indevido de tais conteúdos, reservando-se no direito de caso ter conhecimento de sua 
ilegalidade ou uso indevido, cancelar a <Text style={{fontWeight: "bold"}}>CONTA</Text> do USUÁRIO EMPREENDEDOR e excluir 
seus <Text style={{fontWeight: "bold"}}>APPS</Text>, sem qualquer notificação.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
Caso o USUÁRIO EMPREENDEDOR ou o <Text style={{fontWeight: "bold"}}>USUÁRIO FINAL</Text> encontre conteúdos ou materiais que 
considere ofensivo ou que viole direitos de terceiros em <Text style={{fontWeight: "bold"}}>APPS</Text>, este deverá avisar 
imediatamente o suporte e-mail ajuda@novasantarita.net.br e a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> se 
compromete a investigar referida denúncia. A <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> ainda está autorizada a 
retirar o <Text style={{fontWeight: "bold"}}>APP</Text>, bem como cancelar a <Text style={{fontWeight: "bold"}}>CONTA</Text> do USUÁRIO EMPREENDEDOR em detrimento de 
exigências emanados do poder judiciário.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
Caso a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> venha a ser acionada ou condenada judicialmente, por violações 
cometidas pelo EMPREENDEDOR, em violação a estes <Text style={{fontWeight: "bold"}}>TERMOS DE USO</Text>, o USUÁRIO 
EMPREENDEDOR declara e concorda que deverá ressarcir a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> dos valores 
despendidos, corrigidos monetariamente, bem como das perdas e danos.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O USUÁRIO EMPREENDEDOR concorda em ceder os direitos de uso de imagem, para o uso 
pela <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text>, em mídia espontânea, sem prazo determinado, de forma gratuita, 
sem que este possua o direito a qualquer tipo de remuneração em decorrência deste uso.
      </Text>
      <Text style={styles.tcT}>
        Anúncio e Anunciantes
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O USUÁRIO EMPREENDEDOR concorda e está ciente que a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> poderá inserir 
mídia e publicidade de terceiros, a seu critério e oportunidade, sem qualquer necessidade de
notificação ou aviso.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
A <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> pode divulgar anúncios/ofertas advindos de diversos anunciantes.   
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
A <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> não atua como prestador de serviços de consultoria ou ainda 
intermediário ou participante em nenhum negócio jurídico entre o EMPREENDEDOR, <Text style={{fontWeight: "bold"}}>USUÁRIOS 
FINAIS</Text> e os anunciantes, salvo anúncios da própria <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text>.
      </Text>
      <Text style={styles.tcT}>
      Termos de CONTA
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O USUÁRIO EMPREENDEDOR declara e tem conhecimento que para a utilização do SERVIÇO, 
deverá cumprir o disposto abaixo:  
      </Text>
      <Text style={styles.tcI}>
1.  O USUÁRIO EMPREENDEDOR deve ser humano. <Text style={{fontWeight: "bold"}}>CONTAS</Text> registradas por “robôs” ou 
qualquer outro método automatizado não serão permitidas.
      </Text>
      <Text style={styles.tcI}>
2.  O USUÁRIO EMPREENDEDOR deve fornecer seu nome inteiro, um e-mail válido e 
telefone quaisquer outras informações necessárias para completar o processo de 
cadastro para criação da <Text style={{fontWeight: "bold"}}>CONTA</Text>, sendo responsável pela veracidade das informações 
prestadas.
      </Text>
      <Text style={styles.tcI}>
3.  O USUÁRIO EMPREENDEDOR é responsável por manter a segurança da sua <Text style={{fontWeight: "bold"}}>CONTA</Text> e 
senha. A <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> não pode e não será responsável por qualquer perda ou 
dano de sua falha em cumprir com esta obrigação de segurança.
      </Text>
      <Text style={styles.tcI}>
4. O USUÁRIO EMPREENDEDOR é responsável por todo e qualquer conteúdo publicado 
(texto, dados, gráficos, imagens, fotos, vídeos, etc.) e por todas as atividades que 
ocorrem na sua <Text style={{fontWeight: "bold"}}>CONTA</Text> (mesmo quando o conteúdo é publicado por outras pessoas que 
tenham acesso à sua <Text style={{fontWeight: "bold"}}>CONTA</Text>).
      </Text>
      <Text style={styles.tcI}>
5. O USUÁRIO EMPREENDEDOR não pode utilizar o <Text style={{fontWeight: "bold"}}>SERVIÇO</Text> para fins ilegais ou não 
autorizados. O USUÁRIO EMPREENDEDOR não deve, no uso do <Text style={{fontWeight: "bold"}}>SERVIÇO</Text>, violar as leis 
em sua jurisdição e na jurisdição do APP COMPREMAISAKI (incluindo, mas não se 
limitando a leis de direitos autorais, de propriedade industrial e/ou intelectual).
      </Text>
      <Text style={styles.tcI}>
6. O USUÁRIO EMPREENDEDOR deve deter todos os direitos autorais e de propriedade dos 
conteúdos por ele publicados e compartilhados, ou possuir autorização dos detentores 
de tais conteúdos para sua utilização em compartilhamento.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
Estes termos não conferem ao USUÁRIO EMPREENDEDOR e <Text style={{fontWeight: "bold"}}>USUÁRIOS FINAIS</Text> o direito de usar 
quaisquer marcas ou logotipos utilizados na <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text>, sendo que a infração estará 
sujeita a ações perante os órgãos responsáveis.
      </Text>
      <Text style={styles.tcT}>
        Cancelamento e Término
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O USUÁRIO EMPREENDEDOR é o único responsável por enviar o Comando de cancelar 
adequadamente a sua <Text style={{fontWeight: "bold"}}>CONTA</Text>, ressalvando-se o direito do APP COMPREMAISAKI de cancelar 
a <Text style={{fontWeight: "bold"}}>CONTA</Text> do USUÁRIO EMPREENDEDOR conforme estabelecido neste instrumento. Para realizar 
o cancelamento, o USUÁRIO EMPREENDEDOR deverá realizar a autenticação na área restrita do 
Cadastro de empresas deverá acessara área de cadastro de empesa, e acessar o comando de
CANCELAMENTO, por site ou App. Cancelamentos por telefone ou enviados para qualquer 
endereço eletrônico não serão considerados válidos, e não será realizado.   
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
Todo o conteúdo da <Text style={{fontWeight: "bold"}}>CONTA</Text> será bloqueado o acesso por 30 dias e após esse período poderá 
ser excluído do <Text style={{fontWeight: "bold"}}>SERVIÇO</Text> devido ao cancelamento. Estas informações não podem ser 
recuperadas uma vez que sua <Text style={{fontWeight: "bold"}}>CONTA</Text> seja cancelada.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
A <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text>, a seu exclusivo critério, tem o direito de suspender ou encerrar 
a <Text style={{fontWeight: "bold"}}>CONTA</Text> do USUÁRIO EMPREENDEDOR e recusar toda e qualquer utilização, por qualquer 
pessoa, presente ou futura do <Text style={{fontWeight: "bold"}}>SERVIÇO</Text>, por qualquer motivo, a qualquer momento. Tal 
encerramento do <Text style={{fontWeight: "bold"}}>SERVIÇO</Text> resultará na desativação ou exclusão da <Text style={{fontWeight: "bold"}}>CONTA</Text> do USUÁRIO 
EMPREENDEDOR ou do acesso à sua <Text style={{fontWeight: "bold"}}>CONTA</Text>, e à perda e renúncia de todo o conteúdo em 
sua <Text style={{fontWeight: "bold"}}>CONTA</Text>.
      </Text>
      <Text style={styles.tcT}>
        Modificações aos Serviços e Preços
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
A <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> se reserva o direito de, a qualquer momento e de tempos em tempos, 
modificar ou descontinuar, temporariamente ou permanentemente, o <Text style={{fontWeight: "bold"}}>SERVIÇO</Text> ou parte dele, 
com ou sem aviso prévio.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
A <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> não deverá ser responsabilizada perante ao USUÁRIO EMPREENDEDOR 
ou qualquer terceiro por qualquer modificação, suspensão ou descontinuação do <Text style={{fontWeight: "bold"}}>SERVIÇO</Text>.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
Esporadicamente, a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> pode emitir uma atualização que pode adicionar, 
modificar e/ou remover funcionalidades do APP COMPREMAISAKI, do <Text style={{fontWeight: "bold"}}>APP</Text> ou do <Text style={{fontWeight: "bold"}}>SERVIÇO</Text>. 
Essas atualizações poderão ser inseridas automaticamente sem nenhum aviso. No entanto, 
a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> fará o possível para notificar o USUÁRIO EMPREENDEDOR em sua área 
de membros antecipadamente de uma próxima atualização, incluindo detalhes sobre o que esta 
inclui.
      </Text>
      <Text style={styles.tcT}>
        Como usar os serviços do APP COMPREMAISAKI   
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
      Primeiro, é necessário que o USUÁRIO EMPREENDEDOR siga as políticas disponibilizadas a você 
nos <Text style={{fontWeight: "bold"}}>SERVIÇOS</Text> do APP COMPREMAISAKI.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
Não faça o uso indevido de nossos <Text style={{fontWeight: "bold"}}>SERVIÇOS</Text>. Podemos suspender ou deixar de fornecer 
nossos <Text style={{fontWeight: "bold"}}>SERVIÇOS</Text> caso o USUÁRIO EMPREENDEDOR descumpra qualquer uma de nossas 
políticas ou se estivermos suspeitando e analisando qualquer atitude que considerarmos de má 
conduta, conforme citado acima nos <Text style={{fontWeight: "bold"}}>TERMOS DE USO</Text>.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
Vale reforçar que o uso dos <Text style={{fontWeight: "bold"}}>SERVIÇOS</Text> do APP COMPREMAISAKI não conferem ao USUÁRIO 
EMPREENDEDOR a propriedade sobre direitos de propriedade intelectual sobre os <Text style={{fontWeight: "bold"}}>SERVIÇOS</Text> ou 
sobre o conteúdo dos <Text style={{fontWeight: "bold"}}>APPS</Text> ou de qualquer conteúdo disposto nos domínios do APP 
COMPREMAISAKI supra citados. Você não pode usar conteúdos de nossos <Text style={{fontWeight: "bold"}}>SERVIÇOS</Text> a menos 
que obtenha permissão do proprietário de tais conteúdos ou que o faça por algum meio 
permitido por lei.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
Estes <Text style={{fontWeight: "bold"}}>TERMOS DE USO</Text> não conferem ao USUÁRIO EMPREENDEDOR o direito de usar quaisquer 
marcas ou logotipos utilizados nos <Text style={{fontWeight: "bold"}}>SERVIÇOS</Text>.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
OS <Text style={{fontWeight: "bold"}}>SERVIÇOS</Text> exibem conteúdos que não são do APP COMPREMAISAKI em seus <Text style={{fontWeight: "bold"}}>APPS</Text> e estes 
são de exclusiva responsabilidade do EMPREENDEDOR. A <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> pode revisar o 
conteúdo e definir se este é ilegal ou se fere uma de suas políticas ou dos seus fornecedores e 
distribuidores, o que impedirá ou suspenderá a prestação de qualquer <Text style={{fontWeight: "bold"}}>SERVIÇO</Text>.
      </Text>
      <Text style={styles.tcT}>
        Termos dos serviços de PUBLICAÇÃO dos Dados
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O USUÁRIO EMPREENDEDOR é o único responsável pelos dados de sua empresa.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O USUÁRIO EMPREENDEDOR deve fornecer todas as informações necessárias para que sua 
empresa seja exposta na lista de empresas do aplicativo CompreMaisAki. No caso de não envio 
destas informações, a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> não se responsabilizará pelo atraso e nem por suas 
consequências ou quaisquer prejuízos que o USUÁRIO EMPREENDEDOR venha a ter por esta 
causa. 
      </Text>
      <Text style={[styles.tcP1, {fontSize: 12 + font}]}>
No <Text style={{fontWeight: "bold"}}>SERVIÇO DE PUBLICAÇÃO</Text>, a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> se propõe a fazer a inserção 
dos <Text style={{fontWeight: "bold"}}>APPS</Text> nas <Text style={{fontWeight: "bold"}}>LOJAS</Text> e não garante a aprovação ou aceitação da publicação de 
nenhum APP criado pelo EMPREENDEDOR, para distribuição em outros provedores de 
plataforma móvel.
      </Text>
      <Text style={[styles.tcP1, {fontSize: 12 + font}]}>
Com a contratação dos serviços de <Text style={{fontWeight: "bold"}}>PUBLICAÇÃO</Text>, o USUÁRIO EMPREENDEDOR terá o direito a 
submeter o <Text style={{fontWeight: "bold"}}>APP</Text> duas vezes. Se o pedido for negado pelo provedor da <Text style={{fontWeight: "bold"}}>LOJA</Text> por duas vezes, o 
USUÁRIO EMPREENDEDOR pode cancelar sua <Text style={{fontWeight: "bold"}}>CONTA</Text>, não havendo, entretanto, reembolso sob 
nenhuma circunstância conforme abaixo.
      </Text>
      <Text style={[styles.tcP1, {fontSize: 12 + font}]}>
Caso as empresas Google INC. e Apple INC. façam alguma alteração em seus padrões e 
exigências para que os aplicativos sejam publicados nas lojas da Play Store e App Store, 
respectivamente, a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> não será responsabilizada em nenhum momento ou 
circunstância pela interrupção dos serviços.
      </Text>
      <Text style={styles.tcT}>
        Serviço de CRIAÇÃO DE CONTA nas Lojas
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O USUÁRIO EMPREENDEDOR fornecerá todas as informações necessárias para que sua conta 
seja criada. No caso de não envio destas informações, a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> não se 
responsabiliza pelo atraso e nem por suas consequências ou quaisquer prejuízos que o USUÁRIO 
EMPREENDEDOR venha a ter por esta causa.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
No caso de suspensão ou banimento da conta nas <Text style={{fontWeight: "bold"}}>LOJAS</Text>, a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> não se 
responsabiliza por quaisquer danos, prejuízos financeiros ou pessoais ou outras externalidades 
causadas pela retirada dos <Text style={{fontWeight: "bold"}}>APPS</Text> das <Text style={{fontWeight: "bold"}}>LOJAS</Text> e não haverá reembolso em hipótese alguma, sem 
exceções, para que todos sejam tratados de forma única. A <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> não se 
responsabiliza caso o USUÁRIO EMPREENDEDOR infrinja quaisquer políticas e não agirá em 
nenhum momento como corresponsável e nem como intermediário. Nesta situação o USUÁRIO 
EMPREENDEDOR deve entrar em contato com a <Text style={{fontWeight: "bold",color: "#119999"}} onPress={() => Linking.openURL('https://support.google.com/googleplay/android-developer#topic=3450769')}>GOOGLE PLAY</Text> e com a <Text style={{fontWeight: "bold",color: "#119999"}} onPress={() => Linking.openURL('https://developer.apple.com/support/')}>APP STORE</Text>.
      </Text>
      <Text style={styles.tcT}>
        Direitos autorais e Propriedade de Conteúdo
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
A <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> não realiza seleção prévia do conteúdo, mas a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> e 
seus representantes têm o direito (mas não a obrigação), a seu exclusivo critério, de recusar ou 
remover qualquer conteúdo que seja disponibilizado através do <Text style={{fontWeight: "bold"}}>SERVIÇO</Text>.
      </Text>
      <Text style={styles.tcT}>
        Privacidade
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O USUÁRIO EMPREENDEDOR e Imagens divulgadas devem respeitar todas as leis e 
regulamentações aplicáveis de privacidade e Propriedade Intelectual e Industrial, seus termos e 
condições.
      </Text>
      <Text style={styles.tcT}>
        Condições Gerais
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O uso do <Text style={{fontWeight: "bold"}}>SERVIÇO</Text> é por própria conta e risco do EMPREENDEDOR. O <Text style={{fontWeight: "bold"}}>SERVIÇO</Text> é fornecido 
“como está” e “conforme estiver disponível”.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
Apoio técnico está disponível somente através do e-mail para o COMPREMAISAKI.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O USUÁRIO EMPREENDEDOR autoriza a utilização, reutilização e concede aos outros o direito 
de usar e reutilizar o seu conteúdo, e qualquer reprodução ou simulação deste, em qualquer 
forma de mídia ou tecnologia atualmente conhecida ou desenvolvida no futuro, durante e após 
o uso de <Text style={{fontWeight: "bold"}}>SERVIÇOS</Text>, para quaisquer fins relacionados ao <Text style={{fontWeight: "bold"}}>SERVIÇO</Text>.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O USUÁRIO EMPREENDEDOR entende que a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> se utiliza de terceiros e 
servidores parceiros para o fornecimento dos hardwares, softwares, serviços de rede, 
armazenamento e tecnologias relacionadas que são necessárias para executar o <Text style={{fontWeight: "bold"}}>SERVIÇO</Text>.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
Não caberá em nenhum momento o requerimento do código-fonte da plataforma, sendo ele de 
direito exclusivo e permanente da <Text style={{fontWeight: "bold"}}>APLICATIVOS PARA CELULAR</Text>.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O USUÁRIO EMPREENDEDOR não deve modificar, adaptar ou “hackear” o <Text style={{fontWeight: "bold"}}>SERVIÇO</Text>, ou modificar 
outro website de modo a implicar falsamente que está associado com o <Text style={{fontWeight: "bold"}}>SERVIÇO</Text>, ou qualquer
outro serviço do APP COMPREMAISAKI .
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O USUÁRIO EMPREENDEDOR concorda em não reproduzir ou duplicar ou copiar qualquer parte 
do <Text style={{fontWeight: "bold"}}>SERVIÇO</Text> ou acesso ao <Text style={{fontWeight: "bold"}}>SERVIÇO</Text> sem permissão expressa e escrita do APP COMPREMAISAKI.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
A <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> pode remover o conteúdo e <Text style={{fontWeight: "bold"}}>CONTAS</Text> que contenham conteúdo que 
determinar, segundo critério exclusivo, como ilegal, imoral, ofensivo, ameaçador, calunioso, 
difamatório ou questionável, ou que viole qualquer propriedade intelectual de qualquer parte 
ou a estes <Text style={{fontWeight: "bold"}}>TERMOS DE USO</Text>.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
Abusos verbais, físicos, escritos ou outros (incluindo ameaças de insulto ou vingança) a qualquer 
cliente, empregado, membro ou funcionário do APP COMPREMAISAKI, resultará no 
cancelamento imediato da <Text style={{fontWeight: "bold"}}>CONTA</Text>.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O USUÁRIO EMPREENDEDOR entende que o processamento técnico e a transmissão 
do <Text style={{fontWeight: "bold"}}>SERVIÇO</Text>, incluindo seu conteúdo, podem ser transferidos sem criptografia e envolvem
      </Text>
      <Text style={styles.tcI}>
(a) transmissões através de várias redes; e
      </Text>
      <Text style={styles.tcI}>
(b) mudanças para se adequar e se adaptar às exigências técnicas para a conexão de redes ou 
dispositivos.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
A <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> não garante que:
      </Text>
      <Text style={styles.tcI}>
1.  O <Text style={{fontWeight: "bold"}}>SERVIÇO</Text> atenderá às suas necessidades específicas;
      </Text>
      <Text style={styles.tcI}>
2.  O <Text style={{fontWeight: "bold"}}>SERVIÇO</Text> será ininterrupto, pontual, seguro, ou livre de erros;
      </Text>
      <Text style={styles.tcI}>
3. Os resultados que podem ser obtidos a partir da utilização do <Text style={{fontWeight: "bold"}}>SERVIÇO</Text> serão precisos 
ou confiáveis;
      </Text>
      <Text style={styles.tcI}>
4. A qualidade de quaisquer produtos, serviços, informações, ou outro material adquirido 
ou obtido pelo USUÁRIO EMPREENDEDOR através do <Text style={{fontWeight: "bold"}}>SERVIÇO</Text> atenderá às suas 
expectativas; e quaisquer erros no <Text style={{fontWeight: "bold"}}>SERVIÇO</Text> serão corrigidos.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O USUÁRIO EMPREENDEDOR entende e concorda expressamente que a HÁBIL INFORMÁTICA 
não será responsável por quaisquer danos diretos, indiretos, incidentais, especiais, 
consequências, ou exemplares, incluindo, mas não limitado a danos por perda de lucros, boa 
vontade, uso, dados, ou outras perdas intangíveis (mesmo se a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> tiver sido 
avisado da possibilidade de tais danos), resultantes de:
      </Text>
      <Text style={styles.tcI}>
1. o uso ou a incapacidade de usar o <Text style={{fontWeight: "bold"}}>SERVIÇO</Text>;
      </Text>
      <Text style={styles.tcI}>
2. o custo de aquisição de bens e serviços resultantes de quaisquer bens, dados, 
informações ou serviços comprados ou obtidos ou mensagens recebidas ou transações 
efetuadas através do <Text style={{fontWeight: "bold"}}>SERVIÇO</Text>;
      </Text>
      <Text style={styles.tcI}>
3. acesso não autorizado ou alteração das suas transmissões ou dados;
      </Text>
      <Text style={styles.tcI}>
4. declarações ou condutas de terceiros sobre o <Text style={{fontWeight: "bold"}}>SERVIÇO</Text>; e
      </Text>
      <Text style={styles.tcI}>
5. ou quaisquer outros assuntos relacionados ao <Text style={{fontWeight: "bold"}}>SERVIÇO</Text>.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O USUÁRIO EMPREENDEDOR concorda em defender, indenizar e manter a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> 
, seus administradores, diretores, funcionários e agentes de e contra quaisquer reivindicações, 
responsabilidades, danos, perdas e despesas, incluindo honorários advocatícios e despesas, 
decorrentes de ou em alguma forma relacionados com:
      </Text>
      <Text style={styles.tcI}>
1. Seu acesso ou utilização do APP COMPREMAISAKI ou do <Text style={{fontWeight: "bold"}}>SERVIÇO</Text>;
      </Text>
      <Text style={styles.tcI}>
2. Sua violação destes <Text style={{fontWeight: "bold"}}>TERMOS DE USO</Text>; ou
      </Text>
      <Text style={styles.tcI}>
3. A violação de qualquer direito de terceiros, incluindo, mas não se limitando a qualquer 
direito de propriedade intelectual, publicidade, de propriedade de confidencialidade, 
privacidade ou direito por si ou por seu <Text style={{fontWeight: "bold"}}>APP</Text>.
      </Text>
      <Text style={[styles.tcP, {fontSize: 12 + font}]}>
O não exercício ou a não imposição de qualquer direito ou disposição dos <Text style={{fontWeight: "bold"}}>TERMOS DE USO</Text> por 
parte do APP COMPREMAISAKI não constituirá uma renúncia de tal direito ou disposição. 
Os <Text style={{fontWeight: "bold"}}>TERMOS DE USO</Text> constituem o acordo integral entre o USUÁRIO EMPREENDEDOR e a <Text style={{fontWeight: "bold"}}>HÁBIL 
INFORMÁTICA</Text> e regulam a utilização do <Text style={{fontWeight: "bold"}}>SERVIÇO</Text>, substituindo quaisquer contratos anteriores 
entre o USUÁRIO EMPREENDEDOR e a <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> referentes à <Text style={{fontWeight: "bold"}}>HÁBIL INFORMÁTICA</Text> 
(incluindo, mas não limitado a todas as versões anteriores dos <Text style={{fontWeight: "bold"}}>TERMOS DE USO</Text>).
      </Text>
      <Text style={[styles.tcP1, {fontSize: 12 + font}]}>
Última atualização: 22 de Março de 2021
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