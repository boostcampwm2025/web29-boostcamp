import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cookbook } from 'src/entities/cookbook.entity';

@Injectable()
export class CookbooksService {
  constructor(
    @InjectRepository(Cookbook)
    private readonly cookbookRepository: Repository<Cookbook>,
  ) {}

  async findByCookbookId(cookbookId: number): Promise<Cookbook> {
    const cookbook = await this.cookbookRepository.findOne({
      where: { id: cookbookId },
      relations: ['tags', 'cookbook_problems', 'cookbook_problems.problem'],
    });

    if (!cookbook) {
      throw new NotFoundException(`Cookbook with ID ${cookbookId} not found`);
    }

    return cookbook;
  }
}
