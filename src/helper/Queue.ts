class Node<T>{
    value: T | undefined
    next: Node<T> | null
    constructor(value: T, next: Node<T> | null = null){
        this.value = value
        this.next = next
    }
}

class Queue<T>{
    head: Node<T> | null
    tail: Node<T> | null
    length: number = 0;
    constructor(){
        this.head = null;
        this.tail = null;

    }

    push(value: T){
        const node = new Node<T>(value);
        this.length += 1
        if(this.tail === null){
            this.head = node;
            this.tail = this.head;
            return;
        }
        this.tail.next = node;
        this.tail = this.tail.next
    }

    pop(){
        if(this.head === null){
            return null;
        }
        this.length -= 1;
        const value = this.head.value;
        if(this.head.next === null){
            this.tail = null;
        }
        this.head = this.head.next;
        return value;
    }

}

// (()=> {
//     const queue = new Queue<number[]>();
//     queue.push([1, 2, 3]);
//     queue.push([1, 2, 4]);
//     queue.push([1, 3, 4]);
//     // console.log(queue.length)
//     const N = queue.length;
//     for(let i = 0; i < N; i++){
//         console.log(queue.pop());
//     }
//     queue.push([1,2,4])
//     console.log(`lenght: ${queue.length}`)
//     console.log(queue.pop())
// })()

export default Queue;