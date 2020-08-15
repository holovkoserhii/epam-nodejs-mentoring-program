type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

const dbUsers: User[] = [
  {
    id: "23536534",
    login: "Bret1",
    password: "11",
    age: 44,
    isDeleted: false
  },
  {
    id: "2353623454235235",
    login: "Antonette",
    password: "22",
    age: 33,
    isDeleted: false
  },
  {
    id: "23454235",
    login: "Samantha22",
    password: "33",
    age: 22,
    isDeleted: false
  },
  {
    id: "23454234323125",
    login: "Samantha11",
    password: "332133",
    age: 212,
    isDeleted: false
  },
  {
    id: "2345423432312125",
    login: "Samantha00",
    password: "332133",
    age: 12,
    isDeleted: false
  }
];

export { dbUsers, User };
