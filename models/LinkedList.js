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
    get head() {
    return this.#head;
} 
}
