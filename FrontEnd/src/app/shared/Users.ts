import {User} from './User';

export const USERS: User[] = [{
    _id: "1",
    name:  "Juan",
   surname1: "Rivera",
   surname2: "Maya",
   email:  "juancarballo@gmail.com",
   password: "saludosjuan",
   accounts: [{
        _id: '1',
        name: 'Main',
        totalMoney: 500,
        operations: [{
            _id: '1',
            date: '2010-12-02T17:57:28.556094Z',
            concept: "Groceries",
            amount: -200
        },
        {
            _id: '2',
            date: '2011-12-02T17:57:28.556094Z',
            concept: "Christmas shopping",
            amount: -800           
        },
        {
            _id: '3',
            date: '2012-12-02T17:57:28.556094Z',
            concept: "Salary",
            amount: 1500       
        }
        ]
   },
        {
            _id:'2',
            name: 'Second',
            totalMoney: 0,
            operations: [{
                _id:'1',
                date: '2010-12-02T17:57:28.556094Z',
                concept: "Telephone bills",
                amount: -200
            },
            {
                _id:'2',
                date: '2011-12-02T17:57:28.556094Z',
                concept: "Rent",
                amount: -800           
            },
            {
                _id:'3',
                date: '2012-12-02T17:57:28.556094Z',
                concept: "Stocks Sold",
                amount: 1000       
            }
            ]
        }
   ]


}];