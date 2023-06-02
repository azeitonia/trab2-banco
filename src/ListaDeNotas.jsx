import { useState, useEffect } from 'react';
import { dados } from './notas';
import ItemTabela from './ItemTabela';

const ListadeNotas = () => {
    const [notasDisponiveis, setNotasDisponiveis] = useState(dados);
    const [notasAdicionadas, setNotasAdicionadas] = useState([]);
    const [total, setTotal] = useState(0);
    const [selecionados, setSelecionados] = useState([]);

    useEffect(() => {
        setNotasDisponiveis(dados);
    }, []);

    const adicionaItem = (descricao, foto, valor) => {
        const notaExistente = notasAdicionadas.find(nota => nota.descricao === descricao);

        if (notaExistente) {
            notaExistente.quantidade++;
            setTotal(total + valor);
        } else if (!notaExistente) {
            const novaNota = {
                descricao: descricao,
                foto: foto,
                valor: valor,
                quantidade: 1
            };
            setNotasAdicionadas([...notasAdicionadas, novaNota]);
            setTotal(total + valor);
        }

        setSelecionados(prevSelecionados => {
            if (!prevSelecionados.includes(valor)) {
                return [...prevSelecionados, valor];
            }
            return prevSelecionados;
        });
    };

    const limpar = () => {
        setNotasAdicionadas([]);
        setTotal(0);
        setSelecionados([]);
    };

    const concluirSaque = () => {
    if (total <= 500) {
        alert('Saque Ok');
        limpar();
    } else {
        alert('Erro... Limite de saque de R$ 500,00');
    }
};

    const tabelaNotas = notasDisponiveis.map(nota => (
        <ItemTabela
            key={nota.id}
            notas={nota}
            adiciona={() => adicionaItem(nota.descricao, nota.foto, nota.valor)}
        />
    ));

    return (
        <div className="container mt-2">

            <div className="row my-3">
                <div className="col-sm-9">
                    <h3>
                        Notas Selecionadas: [{selecionados.join(', ')}]
                    </h3>

                </div>
                <div className="col-sm-3">
                    <h3>Total: R$ {total.toFixed(2)} &nbsp;</h3>
                    
                    <button type="button" className="btn btn-success m-2" onClick={concluirSaque}>Concluir Saque</button>
                    <button type="button" className="btn btn-danger" onClick={limpar}>Limpar</button>
                </div>
            </div>


            <table className="table mt-2">
                <thead>
                    <tr>
                        <h2>Notas Disponíveis</h2>
                        <hr />
                    </tr>
                </thead>
                <tbody>{tabelaNotas}</tbody>
            </table>
        </div>
    );
};

export default ListadeNotas;
