import React, { useEffect, useRef } from 'react';
import './IntegrationsSection.css';

const IntegrationsSection = () => {
  const tools = [
    { name: 'Clay', category: 'Revenue', color: '#ff4a00', icon: 'https://cdn.prod.website-files.com/61477f2c24a826836f969afe/677c0a6767557563354e34a3_Clay%20icon.png', isImage: true },
    { name: 'HubSpot', category: 'Revenue', color: '#ff7a59', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOaDQ6nwUImjjADwgdTK6wJPmpWy5nGnHcwQ&s', isImage: true },
    { name: 'Notion', category: 'Ops', color: '#000000', icon: 'https://www.notion.so/images/notion-logo-block-main.svg', isImage: true },
    { name: 'ClickUp', category: 'Ops', color: '#7b68ee', icon: 'https://clickup.com/images/for-se-page/clickup.png', isImage: true },
    { name: 'Miro', category: 'Product', color: '#050038', icon: 'https://files.readme.io/17d4a23-miro-logo-color-square.png', isImage: true },
    { name: 'Sanity', category: 'Product', color: '#f03e2f', icon: 'https://cdn.sanity.io/images/bclf52sw/production/5fb907ed8742828688bb64400473468761d536da-400x400.png', isImage: true },
    { name: 'Linear', category: 'Product', color: '#5e6ad2', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLYuLXhC0EJSfg8LqgNwFXrFrTeUMW3fPNPg&s', isImage: true },
    { name: 'Apify', category: 'Automation', color: '#3399ff', icon: 'https://blog.apify.com/content/images/2024/02/Apify-logo.png', isImage: true },
    { name: 'Mailchimp', category: 'Revenue', color: '#ffe01b', icon: 'https://images.icon-icons.com/2407/PNG/512/mailchimp_icon_146054.png', isImage: true },
    { name: 'Salesforce', category: 'Revenue', color: '#00a1e0', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1280px-Salesforce.com_logo.svg.png', isImage: true },
    { name: 'Zapier', category: 'Automation', color: '#ff4a00', icon: 'https://cdn.zapier.com/zapier/images/logos/social.png', isImage: true },
    { name: 'Claude', category: 'AI', color: '#d97757', icon: 'https://wpforms.com/wp-content/uploads/2024/08/claude-logo.png', isImage: true },
    { name: 'Make', category: 'Automation', color: '#7b68ee', icon: 'https://images.ctfassets.net/un655fb9wln6/7rteYyCjRAGIxwDxCOfv9A/aadf7fd85eaf27d9f59475110a5d30dd/Make-Icon-Square-Purple.svg', isImage: true },
    { name: 'Gusto', category: 'People', color: '#ff5c39', icon: 'https://wpforms.com/wp-content/uploads/cache/integrations/669824a815a36cb6bd5a186e312362d0.png', isImage: true },
    { name: 'Framer', category: 'Product', color: '#000000', icon: 'https://framerusercontent.com/images/MadJ73ykiBPmXMK5j0iTVYDPACI.png?width=1024&height=1024', isImage: true },
    { name: 'Rippling', category: 'People', color: '#ffcc00', icon: 'https://cdn.sanity.io/images/599r6htc/regionalized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png', isImage: true },
    { name: 'Slack', category: 'Ops', color: '#4a154b', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3mPYVDehq6Y1uj1Bz-Ha6DU457FBBtHkaRA&s', isImage: true },
    { name: 'Webhook', category: 'Automation', color: '#3399ff', icon: 'https://img.icons8.com/color/1200/webhook.jpg', isImage: true },
    { name: 'Attio', category: 'Revenue', color: '#000000', icon: 'https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_a22500b967573c02ec2b7eae88da49fc/attio.png', isImage: true },
    { name: 'Clari', category: 'Revenue', color: '#3b82f6', icon: 'https://media.licdn.com/dms/image/v2/D560BAQFA-1jcghT1jQ/company-logo_200_200/company-logo_200_200/0/1738948074602/clari_logo?e=2147483647&v=beta&t=mMpgG5YOd0TSJ1b1NSD8hMbI0q7BitP5TwinxC8IK4o', isImage: true },
    { name: 'PostHog', category: 'Product', color: '#000000', icon: 'https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_d454e5361d4095df745ece8807a7f730/posthog.png', isImage: true },
    { name: 'Instantly', category: 'Revenue', color: '#3b82f6', icon: 'https://instantly.ai/blog/content/images/2024/05/cleaned_rounded.png', isImage: true },
    { name: 'Apollo', category: 'Revenue', color: '#ff4a00', icon: 'https://play-lh.googleusercontent.com/3TRenpb3zBDoRTurTpPFsmFPQYeByFoqKDxBIQ_nayEo3qUYw8bDiB0lYGUf9d3QiQ=w600-h300-pc0xffffff-pd', isImage: true },
    { name: 'Perplexity', category: 'AI', color: '#3b82f6', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5eExEMofdAHli25pCT7tELdcODUZu8HOw1g&s', isImage: true },
    { name: 'Midjourney', category: 'AI', color: '#000000', icon: 'https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_4a8fbacabd3730a32a03317f7b69cac6/midjourney.png', isImage: true },
    { name: 'Loom', category: 'Ops', color: '#ff4a00', icon: 'https://images.g2crowd.com/uploads/vendor/image/17630/large_detail_c4bc02392e38ee696952fcd6ed2fd2d6.jpeg', isImage: true },
    { name: 'Replit', category: 'Automation', color: '#f26b00', icon: 'https://images.g2crowd.com/uploads/product/image/9f03b3f3f0f3eaaab5879190c2e2eb56/replit.png', isImage: true },
    { name: 'Supabase', category: 'Automation', color: '#3ecf8e', icon: 'https://images.g2crowd.com/uploads/product/hd_favicon/71506b5f01eaefca430fe84b5207cf1c/supabase-supabase.jpeg', isImage: true },
    { name: 'BambooHR', category: 'People', color: '#61a60e', icon: 'https://images.g2crowd.com/uploads/product/image/648dde46457d881752db10d9c92d2cd1/bamboohr.png', isImage: true },
    { name: 'UserGems', category: 'Revenue', color: '#3b82f6', icon: 'https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_c638a616ededa78c55f67b106d08cdc4/usergems.png', isImage: true },
    { name: 'SAP', category: 'Ops', color: '#008fd3', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/3840px-SAP_2011_logo.svg.png', isImage: true },
    { name: 'AsanaPro', category: 'Ops', color: '#f95d6a', icon: 'https://cdn.prod.website-files.com/64da81538e9bdebe7ae2fa11/64ee6c441b07b9e11db3dc92_A%20mark%20circle.svg', isImage: true },
    { name: 'Teachable', category: 'Product', color: '#2b3035', icon: 'https://www.pointagram.com/wp-content/uploads/2023/05/TeachableLogo.png', isImage: true },
    { name: 'GustoPro', category: 'People', color: '#ff5c39', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ58f__Hs5QwGWIEcsawDwW1o5IQzaYNPONhQ&s', isImage: true },
    { name: 'Mark', category: 'Revenue', color: '#3b82f6', icon: 'https://dhygzobemt712.cloudfront.net/Mark/Mark_Logo_Blue.svg', isImage: true },
    { name: 'Lovable', category: 'AI', color: '#ff4a00', icon: 'https://lovable.dev/img/logo/lovable-icon-bg-light.png', isImage: true },
    { name: 'Sage', category: 'Ops', color: '#00dc00', icon: 'https://www.sage.com/en-us/-/media/images/sagedotcom/master/meta%20data/open%20graph%20images/og-generic-safe-1200w1200h.png', isImage: true },
    { name: 'Lever', category: 'People', color: '#2b3035', icon: 'https://www.lever.co/wp-content/uploads/2023/02/lever-only-logo.png', isImage: true },
    { name: 'Intuit', category: 'Ops', color: '#0077c5', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR099XvsqGBIzK94LubCCRq8yH-5loOKzzuuw&s', isImage: true }
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="integrations-section" ref={sectionRef}>
      <div className="section-container">
        <div className="integrations-header">
          <h2 className="integrations-title">
            Your tools. <span className="text-gradient">Fully Synchronized.</span>
          </h2>
          <p className="integrations-subtitle">
            We don't replace your stack. We connect your Product, Revenue, and People Ops tools into a single, automated operating system.
          </p>
        </div>

        <div className="integrations-grid-wrapper">
          <div className="actual-tools">
            {tools.map((tool, index) => (
              <div 
                key={index} 
                className="tool-card shadow-premium"
                style={{ 
                  '--tool-color': tool.color,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="tool-icon-wrapper-full blink-target">
                  {tool.isImage ? (
                    <img src={tool.icon} alt={tool.name} className="tool-img-icon-large" />
                  ) : (
                    <span className="tool-icon-large">{tool.icon}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
