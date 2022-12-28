import {User} from './User';

export const USERS: User[] = [{
    name:  "Juan",
   surname1: "Rivera",
   surname2: "Maya",
   email:  "juancarballo@gmail.com",
   password: "saludosjuan",
   accounts: [{
        name: 'Main',
        totalMoney: 10000,
        operations: [{
            date: '2010-12-02T17:57:28.556094Z',
            concept: "Groceries",
            amount: -200
        },
        {
            date: '2011-12-02T17:57:28.556094Z',
            concept: "Christmas shopping",
            amount: -800           
        },
        {
             date: '2012-12-02T17:57:28.556094Z',
            concept: "Salary",
            amount: 1500       
        }
        ]
   },
        {
            name: 'Second',
            totalMoney: 2000,
            operations: [{
                date: '2010-12-02T17:57:28.556094Z',
                concept: "Telephone bills",
                amount: -200
            },
            {
                date: '2011-12-02T17:57:28.556094Z',
                concept: "Rent",
                amount: -800           
            },
            {
                date: '2012-12-02T17:57:28.556094Z',
                concept: "Stocks Sold",
                amount: 300       
            }
            ]
        }
   ]


}];
    