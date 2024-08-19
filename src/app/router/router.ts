import { Router } from "express";
import { CategoryRoute } from "../modules/category/category.route";
import { ProductRoute } from "../modules/product/product.route";

const router = Router();

const modulerRoute = [
  {
    path: "/category",
    route: CategoryRoute,
  },
  {
    path: "/product",
    route: ProductRoute,
  },
];

modulerRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

// const router = Router();

// const modularRoute = [
//     {
//         path:"/academic-faculties",
//         route: AcademicFacultyRoute
//     },
//     {
//         path:"/academic-departments",
//         route: AcademicDepartmentRoute
//     },
//     {
//         path:"/academic-semesters",
//         route: AcademicSemesterRoute
//     },
//     {
//         path:"/users",
//         route:userRouter
//     },
//     {
//         path:"/student",
//         route:studentRouter
//     }
// ]

// modularRoute.forEach((route)=>{
//     router.use(route.path, route.route)
// })
// export default router;
