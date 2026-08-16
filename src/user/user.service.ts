import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
}

@Injectable()
export class UserService {
  private readonly users: User[] = [
    { id: 1, name: 'Nut' },
    { id: 2, name: 'An' },
    { id: 3, name: 'Binh' },
    { id: 4, name: 'Chi' },
  ];

  findAll(name?: string): User[] {
    if (!name) {
      return this.users;
    }
    const keyword = name.toLowerCase();
    return this.users.filter((user) =>
      user.name.toLowerCase().includes(keyword),
    );
  }

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  create(name: string): User {
    const newUser: User = {
      id: this.users.length ? Math.max(...this.users.map((u) => u.id)) + 1 : 1,
      name,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, name?: string): User {
    const user = this.findOne(id);
    user.name = name || '';
    return user;
  }
}
