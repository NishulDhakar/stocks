describe('Global Type Definitions', () => {
  describe('Form Types', () => {
    it('should validate SignInFormData structure', () => {
      const signInData: SignInFormData = {
        email: 'test@example.com',
        password: 'password123',
      };

      expect(signInData).toHaveProperty('email');
      expect(signInData).toHaveProperty('password');
      expect(typeof signInData.email).toBe('string');
      expect(typeof signInData.password).toBe('string');
    });

    it('should validate SignUpFormData structure', () => {
      const signUpData: SignUpFormData = {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        country: 'USA',
        investmentGoals: 'Growth',
        riskTolerance: 'Medium',
        preferredIndustry: 'Technology',
      };

      expect(signUpData).toHaveProperty('fullName');
      expect(signUpData).toHaveProperty('email');
      expect(signUpData).toHaveProperty('password');
      expect(signUpData).toHaveProperty('country');
      expect(signUpData).toHaveProperty('investmentGoals');
      expect(signUpData).toHaveProperty('riskTolerance');
      expect(signUpData).toHaveProperty('preferredIndustry');
    });
  });

  describe('Component Props Types', () => {
    it('should validate Option type structure', () => {
      const option: Option = {
        value: 'test',
        label: 'Test Label',
      };

      expect(option).toHaveProperty('value');
      expect(option).toHaveProperty('label');
    });

    it('should validate FooterLinkProps structure', () => {
      const footerLink: FooterLinkProps = {
        text: 'Already have an account?',
        linkText: 'Sign in',
        href: '/sign-in',
      };

      expect(footerLink).toHaveProperty('text');
      expect(footerLink).toHaveProperty('linkText');
      expect(footerLink).toHaveProperty('href');
    });
  });

  describe('Stock Types', () => {
    it('should validate Stock type structure', () => {
      const stock: Stock = {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        exchange: 'NASDAQ',
        type: 'Common Stock',
      };

      expect(stock).toHaveProperty('symbol');
      expect(stock).toHaveProperty('name');
      expect(stock).toHaveProperty('exchange');
      expect(stock).toHaveProperty('type');
    });

    it('should validate StockWithWatchlistStatus extends Stock', () => {
      const stockWithStatus: StockWithWatchlistStatus = {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        exchange: 'NASDAQ',
        type: 'Common Stock',
        isInWatchlist: true,
      };

      expect(stockWithStatus).toHaveProperty('symbol');
      expect(stockWithStatus).toHaveProperty('isInWatchlist');
      expect(typeof stockWithStatus.isInWatchlist).toBe('boolean');
    });

    it('should validate StockWithData structure', () => {
      const stockWithData: StockWithData = {
        userId: 'user123',
        symbol: 'TSLA',
        company: 'Tesla, Inc.',
        addedAt: new Date(),
        currentPrice: 250.50,
        changePercent: 2.5,
        priceFormatted: '$250.50',
        changeFormatted: '+2.5%',
        marketCap: '800B',
        peRatio: '75.2',
      };

      expect(stockWithData).toHaveProperty('userId');
      expect(stockWithData).toHaveProperty('symbol');
      expect(stockWithData).toHaveProperty('company');
      expect(stockWithData).toHaveProperty('addedAt');
      expect(stockWithData.addedAt).toBeInstanceOf(Date);
    });
  });

  describe('Alert Types', () => {
    it('should validate AlertData structure', () => {
      const alertData: AlertData = {
        symbol: 'AAPL',
        company: 'Apple Inc.',
        alertName: 'Price Alert',
        alertType: 'upper',
        threshold: '150',
      };

      expect(alertData).toHaveProperty('symbol');
      expect(alertData).toHaveProperty('alertType');
      expect(['upper', 'lower']).toContain(alertData.alertType);
    });

    it('should validate Alert structure', () => {
      const alert: Alert = {
        id: 'alert123',
        symbol: 'MSFT',
        company: 'Microsoft Corporation',
        alertName: 'Price Alert',
        currentPrice: 350.00,
        alertType: 'lower',
        threshold: 340.00,
        changePercent: -1.5,
      };

      expect(alert).toHaveProperty('id');
      expect(alert).toHaveProperty('currentPrice');
      expect(alert).toHaveProperty('threshold');
      expect(typeof alert.currentPrice).toBe('number');
      expect(typeof alert.threshold).toBe('number');
    });
  });

  describe('Alert Type Literals', () => {
    it('should only allow upper or lower for alertType', () => {
      const upperAlert: AlertData = {
        symbol: 'AAPL',
        company: 'Apple Inc.',
        alertName: 'Upper Alert',
        alertType: 'upper',
        threshold: '160',
      };

      const lowerAlert: AlertData = {
        symbol: 'AAPL',
        company: 'Apple Inc.',
        alertName: 'Lower Alert',
        alertType: 'lower',
        threshold: '140',
      };

      expect(['upper', 'lower']).toContain(upperAlert.alertType);
      expect(['upper', 'lower']).toContain(lowerAlert.alertType);
    });
  });
});