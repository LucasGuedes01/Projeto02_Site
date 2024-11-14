import { models } from 'powerbi-client';

interface PowerBIConfig {
  reportId: string;
  embedUrl: string;
  accessToken: string;
}

class PowerBIService {
  private readonly API_URL = '/api/powerbi';

  async getEmbedConfig(): Promise<PowerBIConfig> {
    try {
      // Em produção, isso seria uma chamada real à API
      // Por enquanto, retornamos dados mockados para desenvolvimento
      return {
        reportId: 'your-report-id',
        embedUrl: 'https://app.powerbi.com/reportEmbed',
        accessToken: 'your-access-token'
      };
    } catch (error) {
      console.error('Error fetching Power BI config:', error);
      throw new Error('Failed to fetch Power BI configuration');
    }
  }

  getEmbedConfig = async (reportType: string): Promise<models.IReportEmbedConfiguration> => {
    const config = await this.getEmbedConfig();
    
    return {
      type: 'report',
      id: config.reportId,
      embedUrl: config.embedUrl,
      accessToken: config.accessToken,
      tokenType: models.TokenType.Embed,
      settings: {
        panes: {
          filters: {
            expanded: false,
            visible: true
          }
        },
        background: models.BackgroundType.Transparent,
      }
    };
  };
}

export const powerBiService = new PowerBIService();