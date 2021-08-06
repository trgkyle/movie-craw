import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class MovieInfoResult {
  @Field((type) => Int)
  id: number;
  @Field((type) => String)
  name: String;
  @Field((type) => String)
  description: String;
  @Field((type) => String)
  poster: String;
  @Field((type) => [MoviePart], { nullable: true })
  movieParts: MoviePart[];
}

@ObjectType()
export class MoviePart {
  @Field((type) => String)
  type: string;
  @Field((type) => String)
  part: string;
  @Field((type) => [MovieServer], { nullable: true })
  movieServers: MovieServer[];
}

@ObjectType()
export class MovieServer {
  @Field((type) => String)
  provider: string;
  @Field((type) => [MovieLink], { nullable: true })
  movieLinks: MovieLink[];
}

@ObjectType()
export class MovieLink {
  @Field((type) => String)
  name: string;
  @Field((type) => String)
  videoLink: string;
}
