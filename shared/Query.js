"use strict";
exports.__esModule = true;
exports.defaultPostQuery = exports.PostSortByEnum = exports.SortingOrder = void 0;
var SortingOrder;
(function (SortingOrder) {
    SortingOrder["ASC"] = "ASC";
    SortingOrder["DESC"] = "DESC";
})(SortingOrder = exports.SortingOrder || (exports.SortingOrder = {}));
var PostSortByEnum;
(function (PostSortByEnum) {
    PostSortByEnum["DATE_CREATED"] = "dateCreated";
    PostSortByEnum["LIKES"] = "likes";
})(PostSortByEnum = exports.PostSortByEnum || (exports.PostSortByEnum = {}));
exports.defaultPostQuery = {
    search: '.',
    order: SortingOrder.ASC,
    sortBy: PostSortByEnum.DATE_CREATED,
    limit: '20'
};
