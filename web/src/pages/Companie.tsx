interface Companie {
    id: number,
  }

function Companie(props:any) {
    return <h1>Hello {props.match.params.id}!</h1>;
}

export default Companie;
  