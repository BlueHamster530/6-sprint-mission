import { prismaClient } from '../libs/constants';
import { ArticleType, ArticleFindOptions } from '../libs/interfaces';

async function findById(id: number, userId?: number) {
    const include = {
        articleLikes: userId ? { where: { userId } } : false,
    };
    return prismaClient.article.findUniqueOrThrow({
        where: {
            id,
        },
        include,
    });
}

async function findAll(findOptions: ArticleFindOptions, userId: number) {
    const include = {
        articleLikes: userId ? { where: { userId } } : false,
    };

    return prismaClient.article.findMany({
        ...findOptions,
        include,
    });
}

async function create(userFields: ArticleType) {
    const { createdAt, comments, articleLikes, ...NewuserFields } = userFields;

    return await prismaClient.article.create({
        data: {
            ...NewuserFields,
        },
    });
}

async function update(id: number, data: ArticleFindOptions) {
    return prismaClient.article.update({
        where: {
            id,
        },
        data: {
            ...data,
        },
    });
}

async function ondelete(id: number) {
    return await prismaClient.article.delete({
        where: {
            id,
        },
    });
}

export default {
    findById,
    findAll,
    create,
    update,
    ondelete,
};
