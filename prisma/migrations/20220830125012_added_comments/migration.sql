-- CreateTable
CREATE TABLE "countries" (
    "COUNTRY_ID" SERIAL NOT NULL,
    "COUNTRY_ISO" CHAR(2) NOT NULL,
    "COUNTRY_ISO3" CHAR(3) NOT NULL,
    "CALLING_CODE" INTEGER,
    "NAME" VARCHAR(80) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("COUNTRY_ID")
);

-- CreateTable
CREATE TABLE "details" (
    "details_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "country" VARCHAR(35) NOT NULL,
    "city" VARCHAR(35) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE,
    "years_of_experience" INTEGER,
    "has_fishing_card" BOOLEAN,
    "biggest_catch" INTEGER,

    CONSTRAINT "address_pkey" PRIMARY KEY ("details_id")
);

-- CreateTable
CREATE TABLE "post" (
    "post_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "reactions" (
    "reaction_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "reactions_pkey" PRIMARY KEY ("reaction_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(35) NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),
    "details_id" UUID,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "comment" (
    "comment_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "parent_id" UUID,
    "content" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("comment_id")
);

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "fk_post_id" FOREIGN KEY ("post_id") REFERENCES "post"("post_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "children_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "post"("post_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_fk" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
