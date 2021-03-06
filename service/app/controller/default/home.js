'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'api hi';
  }

  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
           'article.title as title,' +
           'article.introduce as introduce,' +
           "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
           'article.view_count as view_count ,' +
           'type.typeName as typeName ' +
          'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
           'ORDER BY id DESC';

    const results = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: results,
    };
  }

  async getArticleById() {
    // 先配置路由的动态传值，然后再接收值
    const id = this.ctx.params.id;
    if(id){
      let sql1 = 'UPDATE article SET view_count = (view_count+1) WHERE id='+id;
      let updateRes = await this.app.mysql.query(sql1);
      let updateSuccess = updateRes.affectedRows === 1
      if (updateSuccess) {
        const sql = 'SELECT article.id as id,' +
          'article.title as title,' +
          'article.introduce as introduce,' +
          'article.article_content as article_content,' +
          "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
          'article.view_count as view_count ,' +
          'type.typeName as typeName ,' +
          'type.id as typeId ' +
          'FROM article,type where article.type_id = type.Id and ' +
          'article.id=' + id;

        const result = await this.app.mysql.query(sql);

        this.ctx.body = {
          data: result,
        };
      }
    }
  }

  // 得到类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }

  // 根据类别id获得文章列表
  async getListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE type_id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };

  }
}


module.exports = HomeController;
