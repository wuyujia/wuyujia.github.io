---
title: JPA
index: true
---


JPA 自动生成 POJO 类的脚本

``` groovy
import com.intellij.database.model.DasTable
import com.intellij.database.util.Case
import com.intellij.database.util.DasUtil

/*
 * Available context bindings:
 *   SELECTION   Iterable<DasObject>
 *   PROJECT     project
 *   FILES       files helper
 */

packageName = "com.tb.srdc.mysql.entity;"
typeMapping = [
  (~/(?i)int/)                      : "long",
  (~/(?i)float|double|decimal|real/): "double",
  (~/(?i)datetime|timestamp/)       : "java.sql.Timestamp",
  (~/(?i)date/)                     : "java.sql.Date",
  (~/(?i)time/)                     : "java.sql.Time",
  (~/(?i)/)                         : "String"
]

FILES.chooseDirectoryAndSave("Choose directory", "Choose where to store generated files") { dir ->
  SELECTION.filter { it instanceof DasTable }.each { generate(it, dir) }
}

def generate(table, dir) {
  def className = javaClassName(table.getName(), true)
  def fields = calcFields(table)
  new File(dir, className + ".java").withPrintWriter { out -> generate(out, table.getName(), className, fields) }
}

def generate(out, tableName, className, fields) {
  out.println "package $packageName"
  out.println ""
  out.println "import lombok.Data;"
  out.println "import javax.persistence.*;"
  Set types = new HashSet()
  fields.each() {
      types.add(it.type)
  }
  if (types.contains("Date")) {
      out.println "import java.util.Date;"
  }
  if (types.contains("BigDecimal")) {
      out.println "import java.math.BigDecimal;"
  }
  if (types.contains("InputStream")) {
      out.println "import java.io.InputStream;"
  }
  out.println ""
  out.println "@Data"
  out.println "@Entity"
  out.println "@Table(name = \"$tableName\")"
  out.println "public class $className {"
  out.println ""
  out.println genSerialID()
  out.println ""
  fields.each() {
      // 输出注释
      if (isNotEmpty(it.comment)) {
          out.println "\t/**"
          out.println "\t * ${it.comment.toString()}"
          out.println "\t */"
      }
      if ((it.annos+"").indexOf("[@Id]") >= 0) {
            out.println "\t@Id"
            out.println "\t@GeneratedValue(strategy = GenerationType.IDENTITY)"
      }
      if (it.annos != "") out.println "${it.annos.replace("[@Id]", "")}"
      out.println "\tprivate ${it.type} ${it.name};"
      out.println ""
  }
  out.println ""
// 不要Getter Setter
//  fields.each() {
//    out.println ""
//    out.println "  public ${it.type} get${it.name.capitalize()}() {"
//    out.println "    return ${it.name};"
//    out.println "  }"
//    out.println ""
//    out.println "  public void set${it.name.capitalize()}(${it.type} ${it.name}) {"
//    out.println "    this.${it.name} = ${it.name};"
//    out.println "  }"
//    out.println ""
//  }
  out.println "}"
}



def calcFields(table) {
  DasUtil.getColumns(table).reduce([]) { fields, col ->
      def spec = Case.LOWER.apply(col.getDataType().getSpecification())
      def typeStr = typeMapping.find { p, t -> p.matcher(spec).find() }.value
      def comm = [
              colName : col.getName(),
              name    : javaName(col.getName(), false),
              type    : typeStr,
              comment: col.getComment(),
              annos   : "\t@Column(name = \"" + col.getName() + "\" )"]
      if ("id".equals(Case.LOWER.apply(col.getName())))
          comm.annos += ["@Id"]
      fields += [comm]
  }
}

// 这里是处理数据库表前缀的方法，这里处理的是t_xxx命名的表
// 已经修改为使用javaName, 如果有需要可以在def className = javaName(table.getName(), true)中修改为javaClassName
// 处理类名（这里是因为我的表都是以t_命名的，所以需要处理去掉生成类名时的开头的T，
// 如果你不需要去掉表的前缀，那么请查找用到了 javaClassName这个方法的地方修改为 javaName 即可）
def javaClassName(str, capitalize) {
    def s = com.intellij.psi.codeStyle.NameUtil.splitNameIntoWords(str)
            .collect { Case.LOWER.apply(it).capitalize() }
            .join("")
            .replaceAll(/[^\p{javaJavaIdentifierPart}[_]]/, "_")
    // 去除开头的T  在Groovy中使用字符串 - 51CTO.COM
    s = s[1..s.size() - 1]
    capitalize || s.length() == 1 ? s : Case.LOWER.apply(s[0]) + s[1..-1]
}

def javaName(str, capitalize) {
  def s = com.intellij.psi.codeStyle.NameUtil.splitNameIntoWords(str)
    .collect { Case.LOWER.apply(it).capitalize() }
    .join("")
    .replaceAll(/[^\p{javaJavaIdentifierPart}[_]]/, "_")
  capitalize || s.length() == 1? s : Case.LOWER.apply(s[0]) + s[1..-1]
}

def isNotEmpty(content) {
    return content != null && content.toString().trim().length() > 0
}

static String changeStyle(String str, boolean toCamel) {
    if (!str || str.size() <= 1)
        return str

    if (toCamel) {
        String r = str.toLowerCase().split('_').collect { cc -> Case.LOWER.apply(cc).capitalize() }.join('')
        return r[0].toLowerCase() + r[1..-1]
    } else {
        str = str[0].toLowerCase() + str[1..-1]
        return str.collect { cc -> ((char) cc).isUpperCase() ? '_' + cc.toLowerCase() : cc }.join('')
    }
}

//生成序列化的serialVersionUID
static String genSerialID() {
    return "\tprivate static final long serialVersionUID =  " + Math.abs(new Random().nextLong()) + "L;"
}
```