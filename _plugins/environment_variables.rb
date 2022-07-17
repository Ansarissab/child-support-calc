# Plugin to add environment variables to the `site` object in Liquid templates
 
module Jekyll
 
  class EnvironmentVariablesGenerator < Generator
 
    def generate(site)
      site.config['url'] = ENV['JEKYLL_URL']
      site.config['baseurl'] = ENV['JEKYLL_BASE_URL']
    end
 
  end
 
end