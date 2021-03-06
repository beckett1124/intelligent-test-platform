'use strict';

var baseUrl = '';
if (document.body.getAttribute("origin")) {
    baseUrl = document.body.getAttribute("origin")
} else {
    baseUrl = '';
}
var res = [];
if(baseUrl == "./"){
    res = [
        'js/codemirror/lib/codemirror',
        'js/codemirror/addon/lint/lint',
        'js/codemirror/addon/lint/json-lint',
        'js/codemirror/addon/hint/show-hint',
        'js/codemirror/addon/hint/javascript-hint',
        'js/codemirror/mode/javascript/javascript',
        'js/codemirror/mode/xml/xml',
        'js/codemirror/mode/htmlmixed/htmlmixed',
        'js/codemirror/mode/css/css',
        'js/codemirror/addon/fold/brace-fold',
        'js/codemirror/addon/fold/comment-fold',
        'js/codemirror/addon/fold/foldcode',
        'js/codemirror/addon/fold/foldgutter',
        'js/codemirror/addon/fold/indent-fold',
        'js/codemirror/addon/fold/xml-fold',
        'js/json-lint/jsonlint'
        ,'css!js/codemirror/theme/erlang-dark'
        ,'css!js/codemirror/lib/codemirror'
        ,'css!js/codemirror/addon/lint/lint'
        ,'css!js/codemirror/addon/hint/show-hint'
        ,'css!js/codemirror/addon/fold/foldgutter'
        ,'css!js/codemirror/addon/dialog/dialog'
    ]
} else {
    res = [
        baseUrl+'js/codemirror/lib/codemirror.js',
        baseUrl+'js/codemirror/addon/lint/lint.js',
        baseUrl+'js/codemirror/addon/lint/json-lint.js',
        baseUrl+'js/codemirror/addon/hint/show-hint.js',
        baseUrl+'js/codemirror/addon/hint/javascript-hint.js',
        baseUrl+'js/codemirror/mode/javascript/javascript.js',
        baseUrl+'js/codemirror/mode/xml/xml.js',
        baseUrl+'js/codemirror/mode/htmlmixed/htmlmixed.js',
        baseUrl+'js/codemirror/mode/css/css.js',
        baseUrl+'js/codemirror/addon/fold/brace-fold.js',
        baseUrl+'js/codemirror/addon/fold/comment-fold.js',
        baseUrl+'js/codemirror/addon/fold/foldcode.js',
        baseUrl+'js/codemirror/addon/fold/foldgutter.js',
        baseUrl+'js/codemirror/addon/fold/indent-fold.js',
        baseUrl+'js/codemirror/addon/fold/xml-fold.js',
        baseUrl+'js/json-lint/jsonlint.js'
        ,'css!'+baseUrl+'js/codemirror/theme/erlang-dark.css'
        ,'css!'+baseUrl+'js/codemirror/lib/codemirror.css'
        ,'css!'+baseUrl+'js/codemirror/addon/lint/lint.css'
        ,'css!'+baseUrl+'js/codemirror/addon/hint/show-hint.css'
        ,'css!'+baseUrl+'js/codemirror/addon/fold/foldgutter.css'
        ,'css!'+baseUrl+'js/codemirror/addon/dialog/dialog.css'
    ]
}


define(res, function (codemirror) {
    window.CodeMirror = codemirror ;
});

var app = angular.module('app', [
        'ngAnimate',
        'ngCookies',
        'ngStorage',
        'ui.router',
        'ui.bootstrap',
        'ui.load',
        'ui.jq',
        'app.diff',
        'toaster',
        'ngTable',
        'highcharts-ng',
        'pascalprecht.translate',
        'app.filters',
        'ui.codemirror',
        'oc.lazyLoad',
        'app.directives',
        'app.interceptor'
        ,'app.controllers.mainController'
        ,'app.controllers.pipelineController'
        ,'app.controllers.recommendController'
        ,'app.controllers.expandController'
        ,'app.controllers.RegController'
        ,'app.controllers.ReportController'
        ,'app.controllers.RootCtrl'
        ,'app.controllers.subController'
        ,'app.controllers.AICaseGeneratorController'
        ,'app.services.GlobalStorage'
        ,'app.services.UserService'
        ,'app.services.ZhiziService'
    ])
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$sceDelegateProvider','$httpProvider',
            function ($stateProvider, $urlRouterProvider, $controllerProvider,$compileProvider, $filterProvider, $provide, $sceDelegateProvider,$httpProvider) {

                var whiteList = ['self'];
                whiteList.push('http://bigmom.alimama.net/**');
                if (baseUrl) {
                    whiteList.push(baseUrl + "**");
                }
                $sceDelegateProvider.resourceUrlWhitelist(whiteList);
                $httpProvider.interceptors.push('interceptor');
                // lazy controller, directive and service
                app.controller = $controllerProvider.register;
                app.directive = $compileProvider.directive;
                app.filter = $filterProvider.register;
                app.factory = $provide.factory;
                app.service = $provide.service;
                app.constant = $provide.constant;
                app.value = $provide.value;

                $urlRouterProvider
                    .otherwise('/app/index?appid=1&sceneid=1');
                //.otherwise('/welcome');
                $stateProvider
                    .state('welcome', {
                        url: '/welcome',
                        templateUrl: 'views/v2/wel.html'
                    })
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'views/app.html'
                    })
                    .state('app.index', {
                        url: "/?appid&sceneid&testReportId",
                        templateUrl: "views/subpage.html"
                    })

                    .state('app.subpage', {
                        url: "/index?bussinesid&appid&sceneid&buid&testReportId&query&targetip1&targetip2&showtype&subType",
                        templateUrl: "views/subpage.html"
                    })
                    .state('app.applist',{
                        url: "/applist?appid",
                        templateUrl: "views/v2/applist.html"
                    })
                    .state('app.scenelist',{
                        url: "/scenelist?appid&sceneid",
                        templateUrl: "views/v2/scenelist.html"
                    })
                    .state('app.case',{
                        url: "/case?appid&sceneid&type&caseid&reportid&rd&testReportId&snapId",
                        templateUrl: "views/v2/case.html",
                    })
                    .state('app.deploy',{
                        url: "/deploy?appid&sceneid&type",
                        templateUrl: "views/v2/deploy2.html"
                    })
                    .state('app.deploy2',{
                        url: "/deploy2?appid&sceneid&type",
                        templateUrl: "views/v2/deploy2.html"
                    })
                    .state('app.regtest',{
                        url: "/regtest?appid&sceneid&ptype",
                        templateUrl: "views/v2/reg_test.html"
                    })
                    .state('app.regreport',{
                        url: "/regreport?testReportId&sceneid&appid",
                        templateUrl: "views/v2/reg_report.html"
                    })
                    .state('app.envdetail',{
                        url: "/envdetail?envId&module&sceneid&appid&buid&bussinesid",
                        templateUrl: "views/v2/env_detail.html"
                    })
                    .state('app.colloc',{
                        url: "/colloc?appid&sceneid",
                        templateUrl: "views/v2/colloc_mode.html"
                    })
                    .state('app.pipeline',{
                        url: "/pipeline?stage&appid&sceneid",
                        templateUrl: "views/v2/pipeline.html"
                    })
                    .state('app.picture',{
                        url: "/picture?testcaseid&appid&sceneid",
                        templateUrl: "views/v2/picture.html"
                    })
                    .state('app.manager',{
                        url: "/manager?appid&sceneid&type",
                        templateUrl: "views/v2/manager.html"
                    })
                    .state('app.dsTemplatePage',{
                        url: "/dsTemplatePage?type",
                        templateUrl: "views/v2/template.html"
                    })
                    .state('app.recommend',{
                        url: "/recommend?appid&sceneid&type",
                        templateUrl: "views/v2/recommend.html"
                    })
                    .state('app.expand',{
                        url: "/expand?appid&sceneid&type&caseid",
                        templateUrl: "views/v2/expand.html"
                    })
                    .state('app.plugin',{
                        url: "/plugin?type&id",
                        templateUrl: "views/v2/plugin.html"
                    })
                    .state('app.dashboard',{
                        url: "/dashboard?showtype&reportId",
                        templateUrl: "views/v2/new_board.html"
                    })
                    .state('app.error',{
                        url: "/error",
                        templateUrl: "views/v2/404.html"
                    })
                    .state('app.AICaseGenerator',{
                        url: "/AICaseGenerator?AITaskId",
                        templateUrl: "views/v2/AICaseGenerator.html"
                    })

            }
        ]
    )
    ;