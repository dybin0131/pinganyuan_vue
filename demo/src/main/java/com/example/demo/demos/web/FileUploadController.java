package com.example.demo.demos.web;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

//@CrossOrigin
@RestController
public class FileUploadController {
    //对文件用日期进行分类
    //SimpleDataFormat sdf = new SimpleDataFormat("/yyyy/mm/dd");
    @RequestMapping("/upload")
    //下面未封装？？？
    public Map<String, Object> fileupload(@RequestParam("uploadFile") MultipartFile file,@RequestParam("uploader") String username, HttpServletRequest request){
        Map<String, Object> result = new HashMap<>();
        String originName = file.getOriginalFilename();//获取原始文件名字
        System.out.println("username:"+username);
        //校验一下上传文件类型
//        if(!originName.endsWith(".pdf")){
//            result.put("status","error");
//            result.put("msg","文件类型不符合要求！");
//            return result;
//        }
        //文件夹,由于无法引入时间分类，文件夹名字暂时不加时间
        //String realPath = request.getServletContext().getRealPath("/")+sdf.format(new Data());
        //此路径为项目当前运行的路径，是临时路径，项目重启之后，路径就改变了；
        //可以1.把路径写死 2.用up主写的fastdfs；此处用1
        String realPath = request.getServletContext().getRealPath("/");
        File folder = new File(realPath);
        if(!folder.exists()){
            folder.mkdirs();
        }
        System.out.println("存储路径："+folder.getAbsolutePath());

        //文件后缀判断
        String suffix = "";
        if (originName == null || "".equals(originName)) {
            suffix = "";
        }
        assert originName != null;
        int lastIndexOf = originName.lastIndexOf(".");
        if (lastIndexOf > 0) {
            suffix = originName.substring(originName.lastIndexOf("."));
        }
        System.out.println("suffix: "+suffix);
        //新的文件名
        String newName = UUID.randomUUID().toString()+suffix;

       // String newName = originName;
        //存储文件，并且捕获异常
        try {
            file.transferTo(new File(folder,newName));
            //如果存储成功，就得到文件的url
            String url = request.getScheme()+"://"+ request.getServerName()+":"+request.getServerPort()+"/"+newName;
            System.out.println("url: "+url);
            result.put("status","success");
            result.put("url",url);
            result.put("name",originName);
        } catch (IOException e) {
            result.put("status","error");
            result.put("msg",e.getMessage());
        }
        return result;
    }
}


