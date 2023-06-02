function ItemTabela(props){
    return (
        <tr>
        <td>
          <img src={props.notas.foto} alt="cédula" style={{ width: 200, height: 110 }}  />
        </td>
        <td>
          <h4> {props.notas.descricao}</h4>
          <h4>R$ {props.notas.valor}</h4>
          <button className="btn btn-primary " onClick={props.adiciona}>Adicionar</button>  
        </td>
      </tr>
    )
}

export default ItemTabela 