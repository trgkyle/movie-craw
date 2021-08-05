import { CategoryEntity, CategoryLinkEntity } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

/*
    - Category 
      + name (*)
      + type
      - Category link
        + provider (*) (phimmoi,phephim)
        + link (*) 
*/
@Injectable()
export class CategoryFunction {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(CategoryLinkEntity)
    private categoryLinkRepository: Repository<CategoryLinkEntity>,
  ) {}
  public async createNewCategory(name, type, provider, link): Promise<Boolean> {
    const category = await this.checkCategoryExist(name);
    if (!category) {
      const newCategory = new CategoryEntity();
      newCategory.name = name;
      newCategory.type = type;
      const categoryLink = await this.checkCategoryLinkExist(provider, link);
      if (!categoryLink) {
        const newCategoryLink = new CategoryLinkEntity();
        newCategoryLink.provider = provider;
        newCategoryLink.link = link;
        newCategory.categoryLinks = [];
        newCategory.categoryLinks.push(newCategoryLink);
        await this.categoryLinkRepository.save(newCategoryLink);
      } else {
        newCategory.categoryLinks = [];
        newCategory.categoryLinks.push(categoryLink);
      }
      await this.categoryRepository.save(newCategory);
      return true;
    } else {
      const categoryLink = await this.checkCategoryLinkExist(provider, link);
      if (!categoryLink) {
        const newCategoryLink = new CategoryLinkEntity();
        newCategoryLink.provider = provider;
        newCategoryLink.link = link;
        newCategoryLink.category = category;
        category.categoryLinks.push(newCategoryLink);
        await this.categoryLinkRepository.save(newCategoryLink);
      }
      await this.categoryRepository.save(category);
      return true;
    }
  }
  public async checkCategoryExist(name): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ name });
    if (category) {
      return category;
    }
    return null;
  }
  public async checkCategoryLinkExist(
    provider,
    link,
  ): Promise<CategoryLinkEntity> {
    const categoryLink = await this.categoryLinkRepository.findOne({
      provider,
      link,
    });
    if (categoryLink) {
      return categoryLink;
    }
    return null;
  }
  public async getAllCategories(): Promise<any> {
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.categoryLinks', 'category-link')
      .getMany(); 
    return category;
  }
}
