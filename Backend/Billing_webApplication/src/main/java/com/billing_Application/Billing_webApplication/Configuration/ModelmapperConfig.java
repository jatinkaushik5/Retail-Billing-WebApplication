package com.billing_Application.Billing_webApplication.Configuration;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelmapperConfig {



    @Bean
    public ModelMapper mapper(){
        return new ModelMapper();
    }
}
