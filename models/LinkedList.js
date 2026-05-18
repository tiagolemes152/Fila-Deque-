class LinkedList {
    #head;
    #tail;
    #qtd;


    constructor() {
        this.#head = null;
        this.#tail = null;
        this.#qtd = 0;
    }


    isEmpty() {
        return this.#head === null;
    }

    addFirst(novoDado) {
        const novoNo = new No(novoDado);
        if (this.isEmpty()) {
            this.#head = novoNo;
            this.#tail = novoNo;
        } else {
            novoNo.proximo = this.#head;
            this.#head.anterior = novoNo;
            this.#head = novoNo;
        }
        this.#qtd++;
        return true;
    }


    addLast(novoDado) {
        const novoNo = new No(novoDado);
        if (this.isEmpty())// vazia
            this.#head = novoNo;
        else {
            novoNo.anterior = this.#tail
            this.#tail.proximo = novoNo;


        }
        this.#tail = novoNo;
        this.#qtd++;
        return true;
    }

    addAtIndex(novoDado, posicao) {
        if (this.isEmpty() || posicao <= 0)
            return this.addFirst(novoDado);
        if (posicao >= this.#qtd)
            return this.addLast(novoDado);

        const novoNo = new No(novoDado);
        let aux = this.#head;
        let posAtual = 0;
        while (posAtual < posicao - 1) {
            aux = aux.proximo;
            posAtual++;
        }
        novoNo.anterior = aux;
        novoNo.proximo = aux.proximo;
        aux.proximo = novoNo;
        novoNo.proximo.anterior = novoNo;
        this.#qtd ++;
        return true;

    }


    removeFirst() {
        if (this.isEmpty()) return null;

        const dadoRemovido = this.#head.dado;
        this.#head = this.#head.proximo;

        if (this.#head !== null) {
            this.#head.anterior = null;
        } else {
            this.#tail = null;
        }
        this.#qtd--;
        return dadoRemovido;
    }


    removeLast() {
        if (this.isEmpty()) return null;

        const dadoRemovido = this.#tail.dado;
        this.#tail = this.#tail.anterior;

        if (this.#tail !== null) {
            this.#tail.proximo = null;
        } else {
            this.#head = null;
        }

        this.#qtd--;
        return dadoRemovido;
    }



    get length() {
        return this.#qtd;
    }


    //-------------------------------------
    //Quando um objeto tem um iterator, ele pode ser iterado com construções como [ for(const item of minhaLista)*/


    [Symbol.iterator]() {
        let noAtual = this.#head;
        return {
            next: function () {
                if (noAtual !== null) {
                    let valor = noAtual.dado;
                    noAtual = noAtual.proximo;
                    return { value: valor, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
    //—----------------
    toString() {
        let noAtual = this.#head;
        let retorno = "";
        while (noAtual != null) {
            retorno += `| ${noAtual.dado} `;
            noAtual = noAtual.proximo;
        }
        return retorno + "|";
    }
    //----------------  
    get Last() {
        if (!this.isEmpty())
            return this.#tail.dado;
        else return null;
    }
    getFirst(){
        if(!this.isEmpty())
            return this.#head.dado;
        else return null;
    }

removeAtIndex(posicao) {
        // 1. Validações de borda: lista vazia ou índice fora dos limites
        if (this.isEmpty() || posicao < 0 || posicao >= this.#qtd) {
            return null;
        }

        // 2. Se a posição for a primeira, usa o método que já existe
        if (posicao === 0) {
            return this.removeFirst();
        }

        // 3. Se a posição for a última, usa o método que já existe
        if (posicao === this.#qtd - 1) {
            return this.removeLast();
        }

        // 4. Se for no meio da lista, precisamos caminhar até o nó alvo
        let alvo = this.#head;
        let posAtual = 0;

        while (posAtual < posicao) {
            alvo = alvo.proximo;
            posAtual++;
        }

        // Captura o dado antes de desconectar o nó para poder retornar depois
        const dadoRemovido = alvo.dado;

        // 5. A Re-costura dos ponteiros (Desconecta o nó alvo)
        // O próximo do anterior vira o próximo do alvo
        alvo.anterior.proximo = alvo.proximo;
        
        // O anterior do próximo vira o anterior do alvo
        alvo.proximo.anterior = alvo.anterior;

        // 6. Diminui a quantidade de elementos e retorna o dado da tarefa realizada
        this.#qtd--;
        return dadoRemovido;
    }
}
