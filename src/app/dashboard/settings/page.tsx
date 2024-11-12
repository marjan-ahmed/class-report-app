"use client"
import React, { useState } from 'react';
import { 
  Select, 
  SelectTrigger, 
  SelectContent, 
  SelectItem 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner'; // Ensure the correct import from the toast library
import { toast } from 'sonner';

const SettingsPage: React.FC = () => {
  const [theme, setTheme] = useState<string>('light');
  const [language, setLanguage] = useState<string>('English');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const handleThemeChange = (value: string) => {
    setTheme(value);
    toast.success('Theme updated successfully');
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast.success('Language updated successfully');
  };

  const handleNotificationChange = (type: 'email' | 'sms' | 'push') => {
    setNotifications({ ...notifications, [type]: !notifications[type] });
    toast.success('Notification preferences updated successfully');
  };

  return (
    <div>
      <h1>Settings</h1>
      
      <section>
        <h2>General Settings</h2>
        <div>
          <label>
            Theme:
            <Select onValueChange={handleThemeChange} value={theme}>
              <SelectTrigger>Theme</SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </label>
        </div>
        <div>
          <label>
            Language:
            <Select onValueChange={handleLanguageChange} value={language}>
              <SelectTrigger>Language</SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
                {/* Add more languages as needed */}
              </SelectContent>
            </Select>
          </label>
        </div>
      </section>
      
      <section>
        <h2>Notification Preferences</h2>
        <div>
          <label>
            Email Notifications
            <Switch 
              checked={notifications.email} 
              onCheckedChange={() => handleNotificationChange('email')} 
            />
          </label>
        </div>
        <div>
          <label>
            SMS Notifications
            <Switch 
              checked={notifications.sms} 
              onCheckedChange={() => handleNotificationChange('sms')} 
            />
          </label>
        </div>
        <div>
          <label>
            Push Notifications
            <Switch 
              checked={notifications.push} 
              onCheckedChange={() => handleNotificationChange('push')} 
            />
          </label>
        </div>
      </section>

      {/* Add more sections as needed */}

      <Toaster position="bottom-right" /> {/* Ensure the Toaster is placed correctly */}
    </div>
  );
};

export default SettingsPage;
