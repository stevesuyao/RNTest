package com.rntest;

import com.reactnativenavigation.NavigationActivity;

import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;
import android.view.Gravity;
import android.view.View;
import android.view.Window;
import android.util.TypedValue;
import android.app.ActionBar;
import android.os.Bundle; // required for onCreate parameter

public class MainActivity extends NavigationActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(this.createSplashLayout());
  }

  public LinearLayout createSplashLayout() {
    // LinearLayout splash = new LinearLayout(this);
    // Drawable launch_screen_bitmap = ContextCompat.getDrawable(getApplicationContext(), R.drawable.launch_screen);
    // splash.setBackground(launch_screen_bitmap);
    //
    // return splash;

    Window decorWindow = getWindow();
    decorWindow.setStatusBarColor(Color.parseColor("#000000")); // Hide the status bar.
    int uiOptions = View.SYSTEM_UI_FLAG_FULLSCREEN;
    LinearLayout view = new LinearLayout(this);
    TextView textView = new TextView(this);

    // view.setSystemUiVisibility(uiOptions);
    view.setBackgroundColor(Color.parseColor("#000000"));
    view.setGravity(Gravity.CENTER);

    textView.setTextColor(Color.parseColor("#ffffff"));
    textView.setText("Piaggio Fast Forward");
    textView.setGravity(Gravity.CENTER);
    textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 28);

    view.addView(textView);
    return view;
  }
}
