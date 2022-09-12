#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform float zoom;

#define PI 3.1415926535897932384626433832795

//長さナシ横枠線作成 st, 枠線の上のy座標,枠線の上のy座標を指定 horizontal   
float bar_h(vec2 st, float bar_top, float bar_bottom){
	return step(bar_top, st.y) + step(1 - bar_bottom, 1-st.y);
}

//長さナシ縦枠線作成 st, 枠線の右のx座標,枠線の左のx座標を指定 vertical
float bar_v(vec2 st, float bar_right, float bar_left){
	return step(bar_right, st.x) + step(1 - bar_left, 1-st.x);
}

//長さアリ枠線作成 st,枠線の上のy座標,枠線の上のy座標,枠線の右のx座標,枠線の左のx座標を指定
float bar(vec2 st, float bar_top, float bar_bottom, float bar_right, float bar_left){
	return step(bar_top, st.y) + step(1 - bar_bottom, 1-st.y) + step(bar_right, st.x) + step(1 - bar_left, 1-st.x);
}


//色付け用枠作成
float barcolor(vec2 st, float bar_top, float bar_bottom, float bar_right, float bar_left){
	return step(bar_bottom, st.y) * step(1 - bar_top, 1-st.y) * step(bar_left, st.x) * step(1 - bar_right, 1-st.x);
}

void main(){
	//座標を x : -1 - 1 y : -1 - 1に正規化
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y) / zoom;
    vec3 color = vec3(0.0);
    vec3 coloring_scarlet = vec3(0.0);
    vec3 coloring_blue = vec3(0.0);
    vec3 coloring_yellow = vec3(0.0);
    vec3 paint_scarlet = vec3(0.0);
    vec3 paint_blue = vec3(0.0);
    vec3 paint_yellow = vec3(0.0);
    vec3 outputcolor = vec3(0.0);
    //vec3 color = vec3(0.98, 0.96, 0.9);

    vec3 scarlet = vec3(0.7, 0.113, 0); 
    vec3 blue = vec3(0.076, 0.249, 0.465);
    vec3 yellow = vec3(0.765, 0.692, 0.037);

//背景色
    float left = step(-0.8,st.x);
    float bottom = step(-1,st.y);

    float right = step(0.2,1.0-st.x);
    float top = step(0,1.0-st.y);

    //背景色
    float pct = left * bottom* right * top;

    //枠線
	pct *= bar_h(st, 0.725 + 0.2 * sin(time * 0.9), 0.675 + 0.2 * sin(time * 0.9)) * bar_h(st, 0.225 + 0.1 * sin(0.7 * time), 0.175 + 0.1 * sin(0.7 * time)) * bar_v(st, 0.32 + 0.1*sin(time), 0.28 + 0.1*sin(time)) * bar_v(st, 0.1*sin(time * 0.9) + 0.67, 0.1*sin(time * 0.9) + 0.63) * bar_v(st, -0.18 + 0.2 * sin(time), -0.22 + 0.2 * sin(time)) * bar(st, 1, 0.175 + 0.1 * sin(0.7 * time),-0.63 + 0.1 * sin(0.7 * time),-0.67 + 0.1 * sin(0.7 * time)) * bar(st, -0.425 + 0.45 * sin(0.7*time),-0.475 + 0.45 * sin(0.7*time),1,-0.22 + 0.2 * sin(time));

	//塗りつぶし準備　黒(0)にする scarlet
 	pct *= bar(st, 1, 0.725 + 0.2 * sin(time * 0.9), -0.67 + 0.1 * sin(0.7 * time), -0.8) * bar(st, 1, 0.725 + 0.2 * sin(time * 0.9), -0.22 + 0.2 * sin(time), -0.63 + 0.1 * sin(0.7 * time)) * bar(st, 0.675 + 0.2 * sin(time * 0.9), 0.225 + 0.1 * sin(0.7 * time), -0.67 + 0.1 * sin(0.7 * time), -0.8) * bar(st, 0.675 + 0.2 * sin(time * 0.9), 0.225 + 0.1 * sin(0.7 * time), -0.22 + 0.2 * sin(time), -0.63 + 0.1 * sin(0.7 * time));

 	//scarlet色付け
	coloring_scarlet = vec3(barcolor(st, 1, 0.725 + 0.2 * sin(time * 0.9), -0.67 + 0.1 * sin(0.7 * time), -0.8) + barcolor(st, 1, 0.725 + 0.2 * sin(time * 0.9), -0.22 + 0.2 * sin(time), -0.63 + 0.1 * sin(0.7 * time)) + barcolor(st, 0.675 + 0.2 * sin( time * 0.9), 0.225 + 0.1 * sin(0.7 * time), -0.67 + 0.1 * sin(0.7 * time), -0.8) + barcolor(st, 0.675 + 0.2 * sin(time * 0.9), 0.225 + 0.1 * sin(0.7 * time), -0.22 + 0.2 * sin(time), -0.63 + 0.1 * sin(0.7 * time)));
	paint_scarlet = vec3(scarlet.x * coloring_scarlet.x, scarlet.y * coloring_scarlet.y, scarlet.z * coloring_scarlet.z);

	//塗りつぶし準備　黒(0)にする blue
 	pct *= bar(st, -0.475 + 0.45 * sin(0.7*time), -1, 0.1*sin(time * 0.9) + 0.63, 0.32 + 0.1*sin(time)) * bar(st, -0.475 + 0.45 * sin(0.7*time), -1, 0.8, 0.1*sin(time * 0.9) + 0.67);

 	//blue色付け
	coloring_blue = vec3(barcolor(st, -0.475 + 0.45 * sin(0.7*time), -1, 0.1*sin(time * 0.9) + 0.63, 0.32 + 0.1*sin(time)) + barcolor(st, -0.475 + 0.45 * sin(0.7*time), -1, 0.8, 0.1*sin(time * 0.9) + 0.67));
	paint_blue = vec3(blue.x * coloring_blue.x, blue.y * coloring_blue.y, blue.z * coloring_blue.z);

	//塗りつぶし準備　黒(0)にする yellow
 	pct *= bar(st, 1, 0.725 + 0.2 * sin(time * 0.9), 0.8, 0.1*sin(time * 0.9) + 0.67) * bar(st, 0.675 + 0.2 * sin(time * 0.9), 0.225 + 0.1 * sin(0.7 * time), 0.8, 0.1*sin(time * 0.9) + 0.67);

 	//yellow色付け
	coloring_yellow = vec3(barcolor(st, 1, 0.725 + 0.2 * sin(time * 0.9), 0.8, 0.1*sin(time * 0.9) + 0.67) + barcolor(st, 0.675 + 0.2 * sin(time * 0.9), 0.225 + 0.1 * sin(0.7 * time), 0.8, 0.1*sin(time * 0.9) + 0.67));
	paint_yellow = vec3(yellow.x * coloring_yellow.x, yellow.y * coloring_yellow.y, yellow.z * coloring_yellow.z);

	vec3 skin_color = vec3(0.98, 0.96, 0.9);
	vec3 origin_color = vec3(pct);

    color = vec3(pct);

    outputcolor = vec3(color.x + paint_scarlet.x + paint_blue.x + paint_yellow.x, color.y + paint_scarlet.y + paint_blue.y + paint_yellow.y, color.z + paint_scarlet.z + paint_blue.z + paint_yellow.z);
   
    gl_FragColor = vec4(outputcolor,1.0);
}



