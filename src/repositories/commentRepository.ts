import { prismaClient, Prisma } from '../libs/constants';

async function findAll(take: number, cursor: number | undefined, productId: number | undefined, articleId: number | undefined) {
    const whereClause: Prisma.CommentWhereInput = {};

    if (productId) {
        whereClause.productId = productId;
    } else if (articleId) {
        whereClause.articleId = articleId;
    }

    const findOptions: Prisma.CommentFindManyArgs = {
        take: take,
        where: whereClause,
        orderBy: {
            createdAt: 'desc',
        },
    };

    if (cursor) {
        findOptions.skip = 1;
        findOptions.cursor = {
            id: cursor,
        };
    }

    return prismaClient.comment.findMany(findOptions);
}

async function findById(id: number) {
    return prismaClient.comment.findUniqueOrThrow({
        where: { id },
    });
}

async function create(content: string, productId?: number, articleId?: number) {
    return prismaClient.comment.create({
        data: {
            content,
            productId,
            articleId,
        },
    });
}

async function update(id: number, content: string) {
    return prismaClient.comment.update({
        where: { id },
        data: { content },
    });
}

async function deleteComment(id: number) {
    return prismaClient.comment.delete({
        where: { id },
    });
}

export default {
    findAll,
    findById,
    create,
    update,
    delete: deleteComment,
};