import { Deserializable } from './deserializable.model';

export class Transaction implements Deserializable {
    accountNumber: string;
    description: string;
    endBalance: number;
    mutation: string;
    reference: number;
    startBalance: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
