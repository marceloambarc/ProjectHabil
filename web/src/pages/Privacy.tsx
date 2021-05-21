import React, {  useState } from 'react';

import '../styles/pages/confirm.css';

import logoImg from '../images/cmatextlogo.png';
import tokenCredentials from '../services/token.json';

//---CRIAR USEEFFECT PARA RETURN(<P>LOADING...<P>);
function Privacy(props:any) {
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');

  const tokenUsername = tokenCredentials.username;
  const tokenPassword = tokenCredentials.password;
  const tokenGrantType = tokenCredentials.grant_type;

  return (
    <div id="confirm-container">
      <div className="content-wrapper">

        <main>
            <h1>Políticas de Privacidade</h1>
            <p><img src={logoImg} className="landingImg" alt="CompreMaisAki" /></p>
            <br></br>
            <br></br>

            <p>A HABIL SOLUÇÕES EM INFORMÁTICA, escrita no CNPJ 02.048.638/0001-28, com sede em Canoas</p>
            <p>– RS, doravante denominada unicamente de HÁBIL INFORMÁTICA, estabelece o presente</p>
            <p>instrumento, denominado TERMOS DE USO que permite aos usuários possuidores</p>
            <p>de CONTA no Aplicativo ou site (CompreMaisAki) criarem contas para anuncio de suas</p>
            <p>empresas (APPS) das plataformas Android, iOS, HTML5 para o uso de outros Usuários</p>
            <p>(USUÁRIOS FINAIS) através de seus SERVIÇOS DE DIVULGAÇÂO das Marcas de suas empresas,</p>
            <p>e divulgação de seus produtos e Promoções.</p>
            <br></br>
            <br></br>

            <p>Por este TERMO DE USO, o USUÁRIO EMPREENDEDOR (Usuário que cadastra a empresa com</p>
            <p>os dados da empresa) do APP COMPREMAISAKI fica ciente e concorda que ao utilizar o APP</p>
            <p>COMPREMAISAKI para construir, desenvolver e publicar seu APP, em qualquer plataforma de</p>
            <p>celular ou qualquer loja de aplicativos, automaticamente aderirá e concordará em se submeter</p>
            <p>integralmente às condições do presente TERMO DE USO e qualquer de suas alterações</p>
            <p>futuras.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <p>A HÁBIL INFORMÁTICA se reserva no direito de atualizar e modificar os TERMOS DE</p>
            <p>USO periodicamente, sem notificar a sua base de o USUÁRIOS EMPREENDEDORES. Quaisquer</p>
            <p>novos recursos que aumentem ou aprimorem os SERVIÇOS atuais, incluindo a liberação ou</p>
            <p>exclusão de novas ferramentas e funcionalidades, estarão sujeitos aos TERMOS DE USO. O uso</p>
            <p>continuado do SERVIÇO após qualquer alteração constituirá anuências às referidas mudanças.</p>
            <p>O USUÁRIO EMPREENDEDOR poderá rever a versão mais recente dos TERMOS DE USO a</p>
            <p>qualquer momento através desta página.</p>
            <br></br>
            <br></br>

            <p>O USUÁRIO EMPREENDEDOR declara que está consciente de que a violação de qualquer das</p>
            <p>disposições estipuladas neste instrumento poderá resultar no cancelamento de</p>
            <p>sua CONTA (“CONTA”) sem qualquer notificação, de modo que o USUÁRIO EMPREENDEDOR</p>
            <p>ficará impossibilitado de criar APPS, bem como poderá resultar na exclusão do APPS do APP</p>
            <p>COMPREMAISAKI e das lojas onde o APP poderá ter sido disponibilizado (Apple App Store e</p>
            <p>Google Play), conjuntamente com todo seu conteúdo e sua base de dados.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            <h2>Nossas Responsabilidades</h2>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <p>Quando permitido por lei, a HÁBIL INFORMÁTICA e seus fornecedores ou distribuidores não se</p>
            <p>responsabilizarão por perda de lucros, perda de faturamento (receita), perda de dados e</p>
            <p>informações, perdas financeiras ou por danos indiretos, especiais, consequenciais, exemplares</p>
            <p>ou punitivos.</p>
            <br></br>
            <br></br>
            <br></br>

            <p>Na medida permitida pela legislação, a responsabilidade total do APP COMPREMAISAKI e de</p>
            <p>seus fornecedores e distribuidores, para qualquer reclamação sob estes termos, incluindo</p>
            <p>quaisquer garantias implícitas, limita-se ao valor que você pagou, à HÁBIL INFORMÁTICA para</p>
            <p>usar os SERVIÇOS. Fica a nosso critério se forneceremos os SERVIÇOS a você novamente.</p>
            <p>Em todos os casos, a HÁBIL INFORMÁTICA e seus fornecedores e distribuidores não serão</p>
            <p>responsáveis por qualquer perda ou dano que não seja razoavelmente previsível.</p>
            <br></br>
            <br></br>
            <br></br>

            <h2>Conteúdo</h2>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <p>Conteúdo inclui texto, programas, scripts, gráficos, fotos, sons, imagens, músicas, vídeos,</p>
            <p>combinações audiovisuais, animações, recursos interativos e outros materiais que O(S)</p>
            <p>USUÁRIO(S) EMPREENDEDOR(ES) e o(s) Anunciante(s), têm acesso ou submetem a um APP.</p>
            <br></br>
            <br></br>

            <p>O USUÁRIO EMPREENDEDOR é o proprietário do conteúdo que publica nos APP construídos</p>
            <p>na HÁBIL INFORMÁTICA. O USUÁRIO EMPREENDEDOR declara ter conhecimento de que a</p>
            <p>responsabilidade pelo conteúdo inserido nos APPS é exclusiva do USUÁRIO EMPREENDEDOR</p>
            <p>que a publicar, entende e concorda que a HÁBIL INFORMÁTICA não pode ser responsável pelo</p>
            <p>conteúdo postado ou compartilhado no SERVIÇO.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <p>A HÁBIL INFORMÁTICA proíbe a utilização ou transmissão de conteúdos impróprios</p>
            <p>nos APPS criados na APLICATIVOS PARA CELULAR, conforme listado abaixo, mas não se</p>
            <p>limitando a:</p>
            <br></br>
            <br></br>

            <ol>
                <li><p>Vírus ou outros códigos maliciosos como worms, spywares ou códigos destrutivos</p></li>
                <br></br>
                <li><p>Publicações que visam intimidar, assediar ou praticar bullying contra qualquer tipo de</p>
                    <p>usuário do Aplicativo.</p></li>
                <br></br>
                <li><p>Discurso de ódio, seja ameaçador; incite violência; ou contenha violência gráfica ou</p>
                    <p>desnecessária. Discursos de ódio ou qualquer</p></li>
                <br></br>
                <li><p>Conteúdos e discursos discriminatórios que infrinjam o Artigo 5º, inciso XLI, da</p>
                    <p>Constituição Federal.</p></li>
            </ol>
            <br></br>
            <br></br>

            <p>O USUÁRIO EMPREENDEDOR concorda ainda em usar o SERVIÇO por sua própria conta e risco.</p>
            <p>A HÁBIL INFORMÁTICA não será responsável por quaisquer danos diretos, indiretos,</p>
            <p>incidentais, especiais, consequenciais ou exemplares, incluindo, mas não limitado, a danos por</p>
            <p>perda de lucros, boa vontade, uso, dados ou outras perdas intangíveis, em decorrência da</p>
            <p>utilização imprópria de tais conteúdos.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            <p>Todas as infrações relativas a direitos de propriedade intelectual dos conteúdos publicados e</p>
            <p>compartilhados nos APPS são de exclusiva responsabilidade do USUÁRIO EMPREENDEDOR que</p>
            <p>o publicar, não podendo a HÁBIL INFORMÁTICA em hipótese alguma ser responsabilizada pelo</p>
            <p>uso indevido de tais conteúdos, reservando-se no direito de caso ter conhecimento de sua</p>
            <p>ilegalidade ou uso indevido, cancelar a CONTA do USUÁRIO EMPREENDEDOR e excluir</p>
            <p>seus APPS, sem qualquer notificação.</p>
            <br></br>
            <br></br>

            <p>Caso o USUÁRIO EMPREENDEDOR ou o USUÁRIO FINAL encontre conteúdos ou materiais que</p>
            <p>considere ofensivo ou que viole direitos de terceiros em APPS, este deverá avisar</p>
            <p>imediatamente o suporte e-mail ajuda@novasantarita.net.br e a HÁBIL INFORMÁTICA se</p>
            <p>compromete a investigar referida denúncia. A HÁBIL INFORMÁTICA ainda está autorizada a</p>
            <p>retirar o APP, bem como cancelar a CONTA do USUÁRIO EMPREENDEDOR em detrimento de</p>
            <p>exigências emanados do poder judiciário.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <p>Caso a HÁBIL INFORMÁTICA venha a ser acionada ou condenada judicialmente, por violações</p>
            <p>cometidas pelo EMPREENDEDOR, em violação a estes TERMOS DE USO, o USUÁRIO</p>
            <p>EMPREENDEDOR declara e concorda que deverá ressarcir a HÁBIL INFORMÁTICA dos valores</p>
            <p>despendidos, corrigidos monetariamente, bem como das perdas e danos.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <p>O USUÁRIO EMPREENDEDOR concorda em ceder os direitos de uso de imagem, para o uso</p>
            <p>pela HÁBIL INFORMÁTICA, em mídia espontânea, sem prazo determinado, de forma gratuita,</p>
            <p>sem que este possua o direito a qualquer tipo de remuneração em decorrência deste uso.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <p>A HÁBIL INFORMÁTICA pode divulgar anúncios/ofertas advindos de diversos anunciantes.</p>
            <br></br>
            <br></br>

            <p>A HÁBIL INFORMÁTICA não atua como prestador de serviços de consultoria ou ainda</p>
            <p>intermediário ou participante em nenhum negócio jurídico entre o</p>
            <p>EMPREENDEDOR, USUÁRIOS FINAIS e os anunciantes, salvo anúncios da própria HÁBIL</p>
            <p>INFORMÁTICA</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <h2>Termos de CONTA</h2>
            <br></br>
            <br></br>
            <p>O USUÁRIO EMPREENDEDOR declara e tem conhecimento que para a utilização do SERVIÇO,</p>
            <p>deverá cumprir o disposto abaixo:</p>
            <br></br>
            <br></br>
            <br></br>

            <ol>
                <li><p>O USUÁRIO EMPREENDEDOR deve ser humano. CONTAS registradas por “robôs” ou</p>
                    <p>qualquer outro método automatizado não serão permitidas.</p></li>
                    <br></br>
                <li><p>O USUÁRIO EMPREENDEDOR deve fornecer seu nome inteiro, um e-mail válido e</p>
                    <p>telefone quaisquer outras informações necessárias para completar o processo de</p>
                    <p>cadastro para criação da CONTA, sendo responsável pela veracidade das informações</p>
                    <p>prestadas.</p></li>
                    <br></br>
                <li><p>O USUÁRIO EMPREENDEDOR é responsável por manter a segurança da sua CONTA e</p>
                    <p>senha. A HÁBIL INFORMÁTICA não pode e não será responsável por qualquer perda ou</p>
                    <p>dano de sua falha em cumprir com esta obrigação de segurança.</p></li>
                <li><p>O USUÁRIO EMPREENDEDOR é responsável por todo e qualquer conteúdo publicado</p>
                    <p>(texto, dados, gráficos, imagens, fotos, vídeos, etc.) e por todas as atividades que</p>
                    <p>ocorrem na sua CONTA (mesmo quando o conteúdo é publicado por outras pessoas</p>
                    <p>que tenham acesso à sua CONTA).</p></li>
                    <br></br>
                <li><p>O USUÁRIO EMPREENDEDOR não pode utilizar o SERVIÇO para fins ilegais ou não</p>
                    <p>autorizados. O USUÁRIO EMPREENDEDOR não deve, no uso do SERVIÇO, violar as leis</p>
                    <p>em sua jurisdição e na jurisdição do APP COMPREMAISAKI (incluindo, mas não se</p>
                    <p>limitando a leis de direitos autorais, de propriedade industrial e/ou intelectual).</p></li>
                    <br></br>
                <li><p>O USUÁRIO EMPREENDEDOR deve deter todos os direitos autorais e de propriedade</p>
                    <p>dos conteúdos por ele publicados e compartilhados, ou possuir autorização dos</p>
                    <p>detentores de tais conteúdos para sua utilização em compartilhamento.</p></li>
                    <br></br>
            </ol>
            <br></br>
            <br></br>
            <br></br>

            <p>Estes termos não conferem ao USUÁRIO EMPREENDEDOR e USUÁRIOS FINAIS o direito de</p>
            <p>usar quaisquer marcas ou logotipos utilizados na HÁBIL INFORMÁTICA, sendo que a infração</p>
            <p>estará sujeita a ações perante os órgãos responsáveis.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <h2>Cancelamento e Término</h2>
            <br></br>
            <br></br>
            <br></br>
            <p>O USUÁRIO EMPREENDEDOR é o único responsável por enviar o Comando de cancelar</p>
            <p>adequadamente a sua CONTA, ressalvando-se o direito do APP COMPREMAISAKI de cancelar</p>
            <p>a CONTA do USUÁRIO EMPREENDEDOR conforme estabelecido neste instrumento. Para</p>
            <p>realizar o cancelamento, o USUÁRIO EMPREENDEDOR deverá realizar a autenticação na área</p>
            <p>restrita do Cadastro de empresas deverá acessara área de cadastro de empesa, e acessar o</p>
            <p>comando de CANCELAMENTO, por site ou App. Cancelamentos por telefone ou enviados para</p>
            <p>qualquer endereço eletrônico não serão considerados válidos, e não será realizado.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>Todo o conteúdo da CONTA será bloqueado o acesso por 30 dias e após esse período poderá</p>
            <p>ser excluído do SERVIÇO devido ao cancelamento. Estas informações não podem ser</p>
            <p>recuperadas uma vez que sua CONTA seja cancelada.</p>
            <br></br>
            <br></br>
            <p>A HÁBIL INFORMÁTICA, a seu exclusivo critério, tem o direito de suspender ou encerrar</p>
            <p>a CONTA do USUÁRIO EMPREENDEDOR e recusar toda e qualquer utilização, por qualquer</p>
            <p>pessoa, presente ou futura do SERVIÇO, por qualquer motivo, a qualquer momento. Tal</p>
            <p>encerramento do SERVIÇO resultará na desativação ou exclusão da CONTA do USUÁRIO</p>
            <p>EMPREENDEDOR ou do acesso à sua CONTA, e à perda e renúncia de todo o conteúdo em</p>
            <p>sua CONTA.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2>Modificações aos Serviços e Preços</h2>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>A HÁBIL INFORMÁTICA se reserva o direito de, a qualquer momento e de tempos em tempos,</p>
            <p>modificar ou descontinuar, temporariamente ou permanentemente, o SERVIÇO ou parte dele,</p>
            <p>com ou sem aviso prévio.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>A HÁBIL INFORMÁTICA não deverá ser responsabilizada perante ao USUÁRIO EMPREENDEDOR</p>
            <p>ou qualquer terceiro por qualquer modificação, suspensão ou descontinuação do SERVIÇO.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>Esporadicamente, a HÁBIL INFORMÁTICA pode emitir uma atualização que pode adicionar,</p>
            <p>modificar e/ou remover funcionalidades do APP COMPREMAISAKI, do APP ou do SERVIÇO.</p>
            <p>Essas atualizações poderão ser inseridas automaticamente sem nenhum aviso. No entanto,</p>
            <p>a HÁBIL INFORMÁTICA fará o possível para notificar o USUÁRIO EMPREENDEDOR em sua área</p>
            <p>de membros antecipadamente de uma próxima atualização, incluindo detalhes sobre o que</p>
            <p>esta inclui.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2>Como usar os serviços do APP COMPREMAISAKI</h2>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>Primeiro, é necessário que o USUÁRIO EMPREENDEDOR siga as políticas disponibilizadas a</p>
            <p>você nos SERVIÇOS do APP COMPREMAISAKI</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>Não faça o uso indevido de nossos SERVIÇOS. Podemos suspender ou deixar de fornecer</p>
            <p>nossos SERVIÇOS caso o USUÁRIO EMPREENDEDOR descumpra qualquer uma de nossas</p>
            <p>políticas ou se estivermos suspeitando e analisando qualquer atitude que considerarmos de</p>
            <p>má conduta, conforme citado acima nos TERMOS DE USO.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>Vale reforçar que o uso dos SERVIÇOS do APP COMPREMAISAKI não conferem ao USUÁRIO</p>
            <p>EMPREENDEDOR a propriedade sobre direitos de propriedade intelectual sobre</p>
            <p>os SERVIÇOS ou sobre o conteúdo dos APPS ou de qualquer conteúdo disposto nos domínios</p>
            <p>do APP COMPREMAISAKI supra citados. Você não pode usar conteúdos de nossos SERVIÇOS a</p>
            <p>menos que obtenha permissão do proprietário de tais conteúdos ou que o faça por algum</p>
            <p>meio permitido por lei.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>Estes TERMOS DE USO não conferem ao USUÁRIO EMPREENDEDOR o direito de usar</p>
            <p>quaisquer marcas ou logotipos utilizados nos SERVIÇOS.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>OS SERVIÇOS exibem conteúdos que não são do APP COMPREMAISAKI em seus APPS e estes</p>
            <p>são de exclusiva responsabilidade do EMPREENDEDOR. A HÁBIL INFORMÁTICA pode revisar o</p>
            <p>conteúdo e definir se este é ilegal ou se fere uma de suas políticas ou dos seus fornecedores e</p>
            <p>distribuidores, o que impedirá ou suspenderá a prestação de qualquer SERVIÇO.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2>Termos dos serviços de PUBLICAÇÃO dos Dados</h2>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>O USUÁRIO EMPREENDEDOR é o único responsável pelos dados de sua empresa.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>O USUÁRIO EMPREENDEDOR deve fornecer todas as informações necessárias para que sua</p>
            <p>empresa seja exposta na lista de empresas do aplicativo CompreMaisAki. No caso de não envio</p>
            <p>destas informações, a HÁBIL INFORMÁTICA não se responsabilizará pelo atraso e nem por</p>
            <p>suas consequências ou quaisquer prejuízos que o USUÁRIO EMPREENDEDOR venha a ter por</p>
            <p>esta causa.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>No SERVIÇO DE PUBLICAÇÃO, a HÁBIL INFORMÁTICA se propõe a fazer a inserção</p>
            <p>dos APPS nas LOJAS e não garante a aprovação ou aceitação da publicação de</p>
            <p>nenhum APP criado pelo EMPREENDEDOR, para distribuição em outros provedores de</p>
            <p>plataforma móvel.</p>
            <br></br>
            <br></br>
            <p>Com a contratação dos serviços de PUBLICAÇÃO, o USUÁRIO EMPREENDEDOR terá o direito a</p>
            <p>submeter o APP duas vezes. Se o pedido for negado pelo provedor da LOJA por duas vezes, o</p>
            <p>USUÁRIO EMPREENDEDOR pode cancelar sua CONTA, não havendo, entretanto, reembolso</p>
            <p>sob nenhuma circunstância conforme abaixo.</p>
            <br></br>
            <br></br>
            <p>Caso as empresas Google INC. e Apple INC. façam alguma alteração em seus padrões e</p>
            <p>exigências para que os aplicativos sejam publicados nas lojas da Play Store e App Store,</p>
            <p>respectivamente, a HÁBIL INFORMÁTICA não será responsabilizada em nenhum momento ou</p>
            <p>circunstância pela interrupção dos serviços.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2>Serviço de CRIAÇÃO DE CONTA nas Lojas</h2>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>O USUÁRIO EMPREENDEDOR fornecerá todas as informações necessárias para que sua conta</p>
            <p>seja criada. No caso de não envio destas informações, a HÁBIL INFORMÁTICA não se</p>
            <p>responsabiliza pelo atraso e nem por suas consequências ou quaisquer prejuízos que o</p>
            <p>USUÁRIO EMPREENDEDOR venha a ter por esta causa.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>No caso de suspensão ou banimento da conta nas LOJAS, a HÁBIL INFORMÁTICA não se</p>
            <p>responsabiliza por quaisquer danos, prejuízos financeiros ou pessoais ou outras externalidades</p>
            <p>causadas pela retirada dos APPS das LOJAS e não haverá reembolso em hipótese alguma, sem</p>
            <p>exceções, para que todos sejam tratados de forma única. A HÁBIL INFORMÁTICA não se</p>
            <p>responsabiliza caso o USUÁRIO EMPREENDEDOR infrinja quaisquer políticas e não agirá em</p>
            <p>nenhum momento como corresponsável e nem como intermediário. Nesta situação o</p>
            <p>USUÁRIO EMPREENDEDOR deve entrar em contato com a</p> 
            <p>PLAY <a href="https://support.google.com/googleplay/android-developer#topic=3450769">aqui</a> e com a APP STORE <a href="https://developer.apple.com/support/">aqui</a>.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2>Direitos autorais e Propriedade de Conteúdo</h2>
            <br></br>
            <br></br>
            <p>A HÁBIL INFORMÁTICA não realiza seleção prévia do conteúdo, mas a HÁBIL INFORMÁTICA e</p>
            <p>seus representantes têm o direito (mas não a obrigação), a seu exclusivo critério, de recusar</p>
            <p>ou remover qualquer conteúdo que seja disponibilizado através do SERVIÇO.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2>Privacidade</h2>
            <br></br>
            <br></br>
            <p>O USUÁRIO EMPREENDEDOR e Imagens divulgadas devem respeitar todas as leis e</p>
            <p>regulamentações aplicáveis de privacidade e Propriedade Intelectual e Industrial, seus termos</p>
            <p>e condições.</p>
            <br></br>
            <br></br>
            <h2>Condições Gerais</h2>
            <br></br>
            <p>O uso do SERVIÇO é por própria conta e risco do EMPREENDEDOR. O SERVIÇO é fornecido</p>
            <p>“como está” e “conforme estiver disponível”.</p>
            <br></br>
            <br></br>
            <p>Apoio técnico está disponível somente através do e-mail para o COMPREMAISAKI .</p>
            <br></br>
            <br></br>
            <p>O USUÁRIO EMPREENDEDOR autoriza a utilização, reutilização e concede aos outros o direito</p>
            <p>de usar e reutilizar o seu conteúdo, e qualquer reprodução ou simulação deste, em qualquer</p>
            <p>forma de mídia ou tecnologia atualmente conhecida ou desenvolvida no futuro, durante e</p>
            <p>após o uso de SERVIÇOS, para quaisquer fins relacionados ao SERVIÇO.</p>
            <br></br>
            <br></br>
            <p>O USUÁRIO EMPREENDEDOR entende que a HÁBIL INFORMÁTICA se utiliza de terceiros e</p>
            <p>servidores parceiros para o fornecimento dos hardwares, softwares, serviços de rede,</p>
            <p>armazenamento e tecnologias relacionadas que são necessárias para executar o SERVIÇO.</p>
            <br></br>
            <br></br>
            <p>Não caberá em nenhum momento o requerimento do código-fonte da plataforma, sendo ele</p>
            <p>de direito exclusivo e permanente da APLICATIVOS PARA CELULAR.</p>
            <br></br>
            <br></br>
            <p>O USUÁRIO EMPREENDEDOR não deve modificar, adaptar ou “hackear” o SERVIÇO, ou</p>
            <p>modificar outro website de modo a implicar falsamente que está associado com o SERVIÇO, ou</p>
            <p>qualquer outro serviço do APP COMPREMAISAKI .</p>
            <br></br>
            <br></br>
            <p>O USUÁRIO EMPREENDEDOR concorda em não reproduzir ou duplicar ou copiar qualquer</p>
            <p>parte do SERVIÇO ou acesso ao SERVIÇO sem permissão expressa e escrita do APP</p>
            <p>COMPREMAISAKI .</p>
            <br></br>
            <br></br>
            <p>A HÁBIL INFORMÁTICA pode remover o conteúdo e CONTAS que contenham conteúdo que</p>
            <p>determinar, segundo critério exclusivo, como ilegal, imoral, ofensivo, ameaçador, calunioso,</p>
            <p>difamatório ou questionável, ou que viole qualquer propriedade intelectual de qualquer parte</p>
            <p>ou a estes TERMOS DE USO.</p>
            <br></br>
            <br></br>
            <p>Abusos verbais, físicos, escritos ou outros (incluindo ameaças de insulto ou vingança) a</p>
            <p>qualquer cliente, empregado, membro ou funcionário do APP COMPREMAISAKI, resultará no</p>
            <p>cancelamento imediato da CONTA.</p>
            <br></br>
            <br></br>
            <p>O USUÁRIO EMPREENDEDOR entende que o processamento técnico e a transmissão</p>
            <p>do SERVIÇO, incluindo seu conteúdo, podem ser transferidos sem criptografia e envolvem</p>
            <br></br>
            <br></br>
            <ol type="a">
                <li>transmissões através de várias redes; e</li>
                <br></br>
                <li><p>mudanças para se adequar e se adaptar às exigências técnicas para a conexão de redes ou</p>
                    <p>dispositivos.</p></li>
            </ol>
            <br></br>
            <br></br>
            <br></br>
            <p>A HÁBIL INFORMÁTICA não garante que:</p>
            <br></br>
            <ol>
                <li>O SERVIÇO atenderá às suas necessidades específicas;</li>
                <br></br>
                <li>O SERVIÇO será ininterrupto, pontual, seguro, ou livre de erros;</li>
                <br></br>
                <li><p>Os resultados que podem ser obtidos a partir da utilização do SERVIÇO serão precisos</p>
                    <p>ou confiáveis;</p></li>
                <br></br>
                <li><p>A qualidade de quaisquer produtos, serviços, informações, ou outro material adquirido</p>
                    <p>ou obtido pelo USUÁRIO EMPREENDEDOR através do SERVIÇO atenderá às suas</p>
                    <p>expectativas; e quaisquer erros no SERVIÇO serão corrigidos.</p></li>
            </ol>
            <br></br>
            <br></br>
            <p>O USUÁRIO EMPREENDEDOR entende e concorda expressamente que a HÁBIL INFORMÁTICA</p>
            <p>não será responsável por quaisquer danos diretos, indiretos, incidentais, especiais,</p>
            <p>consequências, ou exemplares, incluindo, mas não limitado a danos por perda de lucros, boa</p>
            <p>vontade, uso, dados, ou outras perdas intangíveis (mesmo se a HÁBIL INFORMÁTICA tiver sido</p>
            <p>avisado da possibilidade de tais danos), resultantes de:</p>
            <br></br>
            <br></br>
            <ol>
                <li><p>o uso ou a incapacidade de usar o SERVIÇO;</p></li>
                <br></br>
                <li><p>o custo de aquisição de bens e serviços resultantes de quaisquer bens, dados,</p>
                    <p>informações ou serviços comprados ou obtidos ou mensagens recebidas ou transações</p>
                    <p>efetuadas através do SERVIÇO;</p></li>
                    <li><p>acesso não autorizado ou alteração das suas transmissões ou dados;</p></li>
                <br></br>
                <li><p>declarações ou condutas de terceiros sobre o SERVIÇO; e</p></li>
                <br></br>
                <li><p>ou quaisquer outros assuntos relacionados ao SERVIÇO.</p></li>
            </ol>
            <br></br>
            <br></br>
            <p>O USUÁRIO EMPREENDEDOR concorda em defender, indenizar e manter a HÁBIL</p>
            <p>INFORMÁTICA , seus administradores, diretores, funcionários e agentes de e contra quaisquer</p>
            <p>reivindicações, responsabilidades, danos, perdas e despesas, incluindo honorários advocatícios</p>
            <p>e despesas, decorrentes de ou em alguma forma relacionados com:</p>
            <br></br>
            <br></br>
            <ol>
                <li><p>Seu acesso ou utilização do APP COMPREMAISAKI ou do SERVIÇO;</p></li>
                <br></br>
                <li><p>Sua violação destes TERMOS DE USO; ou</p></li>
                <br></br>
                <li><p>A violação de qualquer direito de terceiros, incluindo, mas não se limitando a qualquer</p>
                    <p>direito de propriedade intelectual, publicidade, de propriedade de confidencialidade,</p>
                    <p>privacidade ou direito por si ou por seu APP.</p></li>
            </ol>
            <br></br>
            <br></br>
            <p>O não exercício ou a não imposição de qualquer direito ou disposição dos TERMOS DE USO por</p>
            <p>parte do APP COMPREMAISAKI não constituirá uma renúncia de tal direito ou disposição.</p>
            <p>Os TERMOS DE USO constituem o acordo integral entre o USUÁRIO EMPREENDEDOR e</p>
            <p>a HÁBIL INFORMÁTICA e regulam a utilização do SERVIÇO, substituindo quaisquer contratos</p>
            <p>anteriores entre o USUÁRIO EMPREENDEDOR e a HÁBIL INFORMÁTICA referentes à HÁBIL</p>
            <p>INFORMÁTICA (incluindo, mas não limitado a todas as versões anteriores dos TERMOS DE</p>
            <p>USO).</p>
            <br></br>
            <br></br>
            <br></br>
            <p>Última atualização: 22 de Março de 2021</p>
        </main>
      </div>
    </div>
  ); 
}

export default Privacy;