import React, { Component } from "react";
import "./App.css";
import InputCustomizado from './componentes/InputCustomizado';
import './css/pure-min.css';
import './css/side-menu.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo:"",
      nome:"",	
      amigo: {codigo:"", nome:""},
      list: []
    };
  }

  updateInput(key, value) {
    this.setState({ [key]: value });
  }

  addItem() {
    const amigo = {
      codigo: this.state.codigo,
      nome: this.state.nome
    };

    const list = [...this.state.list];

    list.push(amigo);
  	list.sort(function (a, b) {
	  if (a.codigo> b.codigo) {
	    return 1;
	  }
	  if (a.codigo< b.codigo) {
	    return -1;
	  }
	  return 0;
	});
    this.setState({
      list,
      codigo:"",
      nome:"",
      amigo: {codigo:"", nome:""}
    });
  }

  deletarItem(id) {
    const list = [...this.state.list];
    const updatedList = list.filter(item => item.codigo !== id);

    this.setState({ list: updatedList });
  }
  editarOrdem(id) {

  }

  render() {    
    return (
      <div>
              <div id="main">
                  <div className="header">
                    <h2>Amigos</h2>
                  </div>
                  <div className="content" id="content">
                    <div className="pure-form pure-form-aligned">
                      <form className="pure-form pure-form-aligned" onSubmit={this.addItem} method="post">
                        <InputCustomizado type="number" placeholder="Codigo" value={this.state.codigo} pattern="[0-9]*" onChange={e => this.updateInput("codigo", e.target.value)} label="Código"/>
          				<InputCustomizado type="text" placeholder="Nome" value={this.state.nome} onChange={e => this.updateInput("nome", e.target.value)} label="Nome"/>                                                                      
                        <div className="pure-control-group">                                  
                          <label></label> 
                          <button onClick={() => this.addItem()} disabled={!this.state.nome.length}>Salvar</button>                                    
                        </div>
                      </form>             

                    </div>  
                    <div>            
                      <table className="pure-table">
                        <thead>
                          <tr>
                            <td>Código</td>
                            <td>Nome</td>
                            <td>Ação</td>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.list.map(item => {
                              return (
                                <tr key={item.codigo}>
                                  <td>{item.codigo}</td>
                                  <td>{item.nome}</td>
                                  <td colspan="3"><button onClick={() => this.editarOrdem(item.codigo)}>Editar</button>
                 				  <button onClick={() => this.deletarItem(item.codigo)}>Excluir</button></td>
                                </tr>
                              );
                            })
                          }
                        </tbody>
                      </table> 
                    </div>             
                  </div>
                </div>            


      </div>     
    );
  }
}

export default App;