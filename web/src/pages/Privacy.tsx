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
            <h1>Política de Privacidade</h1>
            <p><img src={logoImg} className="landingImg" alt="CompreMaisAki" /></p>
            <br></br>
            <br></br>
            <ul>
                <li>Informações Gerais</li>
                <br></br>
                <br></br>
            <p>A Presente Política de Privacidade contém informações a respeito do modo como</p>
            <p>tratamos, total ou parcialmente, de forma automatizada ou não, os dados</p>
            <p>pessoais dos usuários que acessam o aplicativo CompremaisAki. Seu objetivo é</p>
            <p>esclarecer os interessados acerca dos tipos de dados que são coletados, dos</p>
            <p>motivos da coleta e da forma como o usuário poderá atualizar, gerenciar ou</p>
            <p>excluir estas informações.</p>
            <br></br>
            <br></br>

            <p>O presente documento foi elaborado em conformidade com a Lei Geral de</p>
            <p>Proteção de Dados Pessoais (Lei 13.709/18) e o Marco Civil da</p>
            <p>Internet (Lei 12.965/14) Ainda, o documento poderá ser atualizado em</p>
            <p>decorrência de eventual atualização normativa, razão pela qual se convida o</p>
            <p>usuário a consultar periodicamente esta seção.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <li>Coleta de dados do usuário</li>
                <br></br>
                <br></br>

            <p>A Política de Privacidade do aplicativo CompremaisAki inclui assegurar que seus</p>
            <p>dados pessoais não serão divulgados a terceiros para fins comerciais, ficando</p>
            <p>restritos à Prefeitura Municipal de Nova Santa Rita e as empresas contratadas e</p>
            <p>órgãos públicos para as quais dados serão encaminhados para a realização do</p>
            <p>serviço solicitado, pesquisa de satisfação e campanhas ativas da PMNSR .</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <li>Quando e quais dados são coletados</li>
                <br></br>
                <br></br>

            <p> Os dados pessoais do usuário são recolhidos pelo aplicativo CompreMaisAki</p>
            <p>das seguinte formas:</p>
            <br></br>
            <br></br>
            <ul>
                <li>
                    <p>Quando o usuário se cadastra no aplicativo: esses dados são os dados de</p>
                    <p>identificação básicos de nome completo, CPF e e-mail.</p>
                </li>
                <li>
                    <p>Quando o usuário atualiza seus dados do aplicativo: neste caso o aplicativo</p>
                    <p>pode solicitar os dados de nome, telefone, e-mail e CEP.</p>
                </li>
                <li>
                    <p>Quando um usuário acessa o aplicativo: neste caso o aplicativo pode</p>
                    <p>coletar os dados de localização do usuário ou do local da ocorrência da</p>
                    <p>solicitação, através do Google. Além disso, serão coletados todos os dados</p>
                    <p>preenchidos nos formulários pelo usuário, referentes à cada tipo de serviço</p>
                    <p>solicitado.</p>
                </li>
            </ul>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            <li>VERIFICAR SOBRE DADOS DE COMPRADORES E INFORMAÇÕES DE PAGAMENTO</li>
            <br></br>
            <br></br>

            <p>VERIFICAR SE EXISTE A POSSIBILIADE DE ACESSO ANÔNIMO - Para alguns</p>
            <p>serviços específicos, a solicitação pode ser feita de forma anônima. Neste caso,</p>
            <p>não há registro das informações pessoais do usuário, incluindo seus contatos. No</p>
            <p>caso de solicitações anônimas, o solicitante não receberá atualizações</p>
            <p>automáticas e não poderá acompanhar sua solicitação na área cadastrada dos</p>
            <p>canais de atendimento. Será possível acompanhar a solicitação apenas buscando</p>
            <p>pelo número do protocolo.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <li>Para que finalidades utilizamos os dados pessoais do usuário</li>
            <br></br>
            <br></br>

            <p>Os dados pessoais do usuário coletados e armazenados pelo aplicativo</p>
            <p>CompreMaisAki tem por finalidade:</p>
            <br></br>
            <br></br>

            <ul>
                <li>
                    <p>Identificar o usuário de modo a garantir que as solicitações sejam abertas</p>
                    <p>corretamente;</p>
                </li>
                <li>
                    <p>Facilitar e agilizar as compras de fornecedores de produtos e serviços com</p>
                    <p>sede no Município de Nova Santa Rita;</p>
                </li>
                <li>
                    <p>Permitir o acesso do usuário a determinados conteúdos do aplicativo,</p>
                    <p>exclusivo para usuários cadastrados;</p>
                </li>
                <li>
                    <p>Garantir a segurança do usuário na abertura de solicitação de compra e</p>
                    <p>serviço.</p>
                </li>
            </ul>
            <br></br>
            <br></br>


            <p>O tratamento de dados pessoais para finalidades não previstas nesta Política de</p>
            <p>Privacidade somente ocorrerá mediante comunicação prévia ao usuário, de modo</p>
            <p>que os direitos e obrigações aqui previstos permanecem aplicáveis.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <li>Dados sensíveis</li>

            <p><b>Não</b> serão coletados dados sensíveis dos usuários, assim entendidos aqueles </p>
            <p>definidos nos arts. 9º e 10 do RGDP e nos arts. 11 e seguintes da Lei de Proteção </p>
            <p>de Dados Pessoais. Assim, dentre outros, não haverá coleta dos seguintes casos:</p>
            <br></br>
            <br></br>

            <ul>
                <li>
                    <p>Dados que revelem a origem racial ou étnica, as opiniões políticas, as</p>
                    <p>convicções religiosas ou filosóficas, ou a filiação sindical do usuário;</p>
                </li>
                <li>
                    <p>Dados Genéticos;</p>
                </li>
                <li>
                    <p>Dados biométricos para identificar uma pessoa de forma inequívoca;</p>
                </li>
                <li>
                    <p>Dados relativos à saúde do usuário;</p>
                </li>
                <li>
                    <p>Dados relativos à vida sexual ou à orientação sexual do usuário;</p>
                </li>
                <li>
                    <p>Dados relacionados a condenações penais ou a infrações ou com medidas</p>
                    <p>de segurança conexas.</p>
                </li>
            </ul>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <li>Armazenamento de dados</li>
            <br></br>
            <br></br>

            <p>Os dados de uma solicitação e do solicitante são armazenados pela Prefeitura</p>
            <p>Municipal de Nova Santa Rita. Todos os dados registrados pelo aplicativo móvel</p>
            <p>são replicados para ambiente de datacenter seguro.</p>
            <br></br>
            <br></br>

            <p>O aplicativo CompremaisAki permite a recuperação de conta cuja senha de</p>
            <p>acesso tenha sido esquecida pelo usuário. Esse procedimento estará visível no</p>
            <p>aplicativo, e será acionado por meio do fornecimento do e-mail cadastrado pelo</p>
            <p>usuário.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <li>Segurança dos dados pessoais armazenados</li>
            <br></br>
            <br></br>

            <p>O aplicativo se compromete a aplicar as medidas técnicas e organizativas aptas</p>
            <p>a proteger os dados pessoais de acessos não autorizados e de situações de</p>
            <p>destruição, perda, alteração, comunicação ou difusão de tais dados.</p>
            <br></br>
            <br></br>

            <p>Os dados pessoais armazenados são tratados com confidencialidade, dentro dos</p>
            <p>limites legais. No entanto, podemos divulgar suas informações pessoais caso</p>
            <p>sejamos obrigados pela lei para fazê-lo ou se você violar nossos Termos de</p>
            <p>Serviço.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <li>Tempo de armazenamento dos dados</li>
            <br></br>
            <br></br>

            <p>Os dados pessoais do usuário são armazenados pelo aplicativo, por tempo</p>
            <p>indeterminado e durante o período necessário para a prestação do serviço ou o</p>
            <p>cumprimento das finalidades previstas no presente documento e termo de uso,</p>
            <p>conforme o disposto no inciso I do artigo 15 da Lei 13.709/18.</p>
            <br></br>
            <br></br>

            <p>Os dados podem ser removidos ou anonimizados a pedido do usuário,</p>
            <p>excetuando os casos em que a lei oferecer outro tratamento.</p>
            <br></br>
            <br></br>

            <p>Ainda, os dados pessoais dos usuários apenas podem ser conservados após o</p>
            <p>término de seu tratamento nas seguintes hipóteses previstas no artigo 16 da</p>
            <p>referida lei:</p>
            <br></br>
            <br></br>

            <ol type="I">
                <li>
                    <p>cumprimento de obrigação legal ou regulatória pelo controlador;</p>
                </li>
                <li>
                    <p>estudo por órgão de pesquisa, garantida, sempre que possível, a</p>
                    <p>anonimização dos dados pessoais;</p>
                </li>
                <li>
                    <p>transferência a terceiro, desde que respeitados os requisitos de tratamento de</p>
                    <p>dados dispostos nesta Lei;</p>
                </li>
                <li>
                    <p>uso exclusivo do controlador, vedado seu acesso por terceiro, e desde que</p>
                    <p>anonimizados os dados.</p>
                </li>
            </ol>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <li>Do tratamento dos dados pessoais</li>
            <br></br>
            <br></br>

            <h2>4.1. Do responsável pelo tratamento dos dados (data controller)</h2>
            <br></br>
            <br></br>

            <p>O controlador, responsável pelo tratamento dos dados pessoais do usuário, é a</p>
            <p>pessoa física ou jurídica, a autoridade pública, a agência ou outro organismo que,</p>
            <p>individualmente ou em conjunto com outras, determina as finalidades e os meios</p>
            <p>de tratamento dos dados pessoais.</p>
            <br></br>
            <br></br>

            <p>Neste aplicativo, o responsável pelo tratamento dos dados pessoais coletados é a</p>
            <p>(alguma secretaria específica?) Prefeitura Municipal de Nova Santa Rita e as</p>
            <p>solicitações abertas pelo aplicativo são tratadas pelos órgãos públicos municipais</p>
            <p>competentes, referentes a cada tipo de serviço solicitado. Tanto a secretaria</p>
            <p>quando os órgãos citados, são partes componentes da Prefeitura Municipal de</p>
            <p>São Paulo, que poderá ser contatada pela Central 156, Portal SP156, Praças de</p>
            <p>atendimento ou Descomplica SP.</p>
            <br></br>
            <br></br>

            <h2>4.2. Do operador de dados subcontratado (data processor)</h2>
            <br></br>
            <br></br>

            <p>O operador de dados subcontratado é a pessoa física ou jurídica, a autoridade</p>
            <p>pública, a agência ou outro organismo que trata os dados pessoais sob</p>
            <p>supervisão do responsável pelo tratamento dos dados do usuário.</p>
            <br></br>
            <br></br>

            <p>Nesse caso os dados pessoais do usuário serão tratados pela pessoa jurídica</p>
            <p>xxxxxxxxxx cujo contato é: e-mail: xxxxxxxx@xxxx.com.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <p>Informamos que a Empresa Hábil Informática, CNPJ 02.048.638/0001-28 não</p>
            <p>representa a entidade governamental da PMNSR – Prefeitura Municipal de Nova</p>
            <p>Santa Rita, estando isenta de qualquer movimento de abrangência que preconiza,</p>
            <p>sobretudo, a abertura das medidas possíveis dos dados constantes do aplicativo,</p>
            <p>atuando exclusivamente de maneira a viabilizar o adequado processamento do</p>
            <p>aplicativo em nuvem da plataforma.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <li>Cancelamento de Cadastro</li>
            <br></br>
            <br></br>

            <p>No caso de cancelamento do cadastro, o registro dos dados fornecidos continua</p>
            <p>armazenado por tempo indeterminado.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <li>Compartilhamento de dados</li>
            <br></br>
            <br></br>

            <p>O compartilhamento de dados do usuário ocorre apenas nos casos essenciais</p>
            <p>para o atendimento das finalidades do aplicativo. Os dados não ficarão</p>
            <p>disponíveis publicamente para outros usuários fora da hipótese acima.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <li>Dever de não fornecer dados a terceiros</li>
            <br></br>
            <br></br>

            <p>Durante a utilização do aplicativo, a fim de resguardar e de proteger os direitos de</p>
            <p>terceiros, o usuário do aplicativo deverá fornecer somente seus dados pessoais e</p>
            <p>não os de terceiros.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <li>Cookies ou dados de navegação</li>

            <p>Os cookies referem-se a arquivos de onde ficam armazenadas as</p>
            <p>informações relacionadas à navegação do usuário no aplicativo. Tais</p>
            <p>informações são relacionadas aos dados de acesso como local e horário</p>
            <p>de acesso e são armazenadas para que o servidor da plataforma possa lê-</p>
            <p>las posteriormente a fim de personalizar os serviços oferecidos.</p>
            <br></br>
            <br></br>

            <p>O usuário do aplicativo CompreMaisAki manifesta conhecer e aceitar que pode</p>
            <p>ser utilizado um sistema de coleta de dados de navegação mediante à utilização</p>
            <p>de cookies.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <li>Responsabilidade dos usuários no fornecimento de dados pessoais</li>
            <br></br>
            <br></br>

            <p>Ao aceitar esta Política de Privacidade, você declara que todas as informações</p>
            <p>fornecidas ao aplicativo móvel CompreMaisAki são verdadeiras, exatas, atuais e</p>
            <p>completas, pois é uma obrigação do usuário atualizá-las para manter a</p>
            <p>veracidade e a exatidão das informações.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <li>Alterações para essa política de privacidade</li>
            <br></br>
            <br></br>

            <p>A presente versão desta Política de Privacidade foi atualizada pela última vez em</p>
            <p>09 de setembro de 2020. Reservamos o direito de modificar este documento a</p>
            <p>qualquer momento, então, é recomendável que o usuário revise-a com</p>
            <p>frequência.</p>
            <br></br>
            <br></br>

            <p>Diante da fusão ou venda do aplicativo à outra empresa, os dados dos usuários</p>
            <p>podem ser transferidas para os novos proprietários para que a permanência dos</p>
            <p>serviços oferecidos.</p>
            <br></br>
            <br></br>

            <p>Ao utilizar o serviço ou fornecer informações pessoais após eventuais</p>
            <p>modificações, o usuário demonstra sua concordância com as novas normas.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <li>Consentimento</li>
            <br></br>
            <br></br>

            <p>Ao utilizar os serviços e fornecer as informações pessoais na plataforma, o </p>
            <p>usuário está consentindo com a presente Política de Privacidade e ao cadastrar-</p>
            <p>se, manifesta conhecer e pode exercitar seus direitos de cancelar seu cadastro,</p>
            <p>acessar e atualizar seus dados pessoais e garante a veracidade das informações</p>
            <p>por ele disponibilizadas.</p>
            <br></br>
            <br></br>

            <p>O usuário tem direito de retirar o seu consentimento a qualquer tempo, para tanto </p>
            <p>deve entrar em contato através do email: ajuda@novasantarita.net.br.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <li>Dúvidas, descumprimentos e denúncias de uso indevido</li>
            <br></br>
            <br></br>

            <p>A competência para o conhecimento, processamento ou julgamento de qualquer</p>
            <p>feito judicial envolvendo a presente Política de Privacidade será do foro da</p>
            <p>comarca de Canoas, renunciando-se expressamente a qualquer outro foro, por</p>
            <p>mais privilegiado que seja. Para a solução de controvérsias decorrentes do</p>
            <p>presente instrumento será aplicado integralmente o Direito brasileiro.</p>
            </ul>
        </main>
      </div>
    </div>
  ); 
}

export default Privacy;