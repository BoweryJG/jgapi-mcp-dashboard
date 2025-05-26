import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export type DataSource = 'mcp' | 'api';

interface DataSourceContextType {
  dataSource: DataSource;
  toggleDataSource: () => void;
  setDataSource: (source: DataSource) => void;
}

const DataSourceContext = createContext<DataSourceContextType | undefined>(undefined);

export const DataSourceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dataSource, setDataSource] = useState<DataSource>('mcp');
  const queryClient = useQueryClient();

  const toggleDataSource = () => {
    setDataSource(prev => prev === 'mcp' ? 'api' : 'mcp');
  };

  // Invalidate all queries when data source changes
  useEffect(() => {
    queryClient.invalidateQueries();
  }, [dataSource, queryClient]);

  return (
    <DataSourceContext.Provider value={{ dataSource, toggleDataSource, setDataSource }}>
      {children}
    </DataSourceContext.Provider>
  );
};

export const useDataSource = () => {
  const context = useContext(DataSourceContext);
  if (!context) {
    throw new Error('useDataSource must be used within a DataSourceProvider');
  }
  return context;
};