import { Deserializable } from './deserializable.model';

export class Transaction implements Deserializable {
    constructor() {}
    accountNumber: string;
    description: string;
    endBalance: number;
    mutation: string;
    reference: number;
    startBalance: number;

    deserialize(input: any) {
        Object.assign(this, {
            accountNumber: input['Account Number'],
            description: input.Description,
            endBalance: input['End Balance'],
            mutation: input.Mutation,
            reference: input.Reference,
            startBalance: input['Start Balance'],
        });
        return this;
    }
}
