import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Compass, TrendingUp, Settings, User, Menu, Send, Library, AlertCircle, Loader, X, Trash2 } from 'lucide-react';
import { mangaApi, type Comic } from '../services/mangaApi';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api'; // Add this import

type TabType = 'explore' | 'top' | 'likes' | 'library';

export const Koma: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const [searchText, setSearchText] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Add this state
  const { user, logout } = useAuth();
  
  // State for comics data
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for popup
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);

  const handleLogoClick = () => {
    navigate('/');
  };

  // Fetch comics based on active tab
  const fetchComics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let fetchedComics: Comic[] = [];
      
      switch (activeTab) {
        case 'explore':
          fetchedComics = await mangaApi.getExploreComics();
          break;
        case 'top':
          fetchedComics = await mangaApi.getTopComics();
          break;
        case 'likes':
          if (user) {
            fetchedComics = await mangaApi.getLikedComics();
          } else {
            setError('Please log in to view your likes');
            return;
          }
          break;
        case 'library':
          if (user) {
            console.log("requesting my lib")
            fetchedComics = await mangaApi.getMyLibrary();
          } else {
            setError('Please log in to view your library');
            setLoading(false);
            return;
          }
          break;
        default:
          fetchedComics = await mangaApi.getExploreComics();
      }
      
      setComics(fetchedComics);
    } catch (err) {
      console.error('Error fetching comics:', err);
      setError('Failed to load comics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch comics when tab changes
  useEffect(() => {
    fetchComics();
  }, [activeTab, user]);

  // Handle liking a comic
  const handleLike = async (comicId: string) => {
    if (!user) {
      setError('Please log in to like comics');
      return;
    }
    
    try {
      console.log('Attempting to like comic:', comicId);
      await mangaApi.likeComic(comicId);
      // Refresh comics to update like count
      await fetchComics();
    } catch (err) {
      console.error('Error liking comic:', err);
      setError('Failed to like comic. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    setActiveTab('explore'); // Reset to explore tab after logout
    setShowProfileMenu(false);
  };

  // Handle delete account
  const handleDeleteAccount = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      await apiService.deleteAccount();
      
      // After successful deletion, logout and redirect
      logout();
      navigate('/');
      setShowDeleteConfirm(false);
      setShowProfileMenu(false);
    } catch (err) {
      console.error('Error deleting account:', err);
      setError('Failed to delete account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle tab changes with user check
  const handleTabChange = (tab: TabType) => {
    if ((tab === 'library' || tab === 'likes') && !user) {
      setError('Please log in to access this section');
      return;
    }
    setError(null);
    setActiveTab(tab);
  };

  async function handleGenerate() {
    if (!searchText.trim()) return;
    if (!user) {
      setError('Please log in to generate comics');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      await mangaApi.generateComic(searchText);
      setSearchText(''); // Clear input after sending
      // Refresh comics if we're on the library tab to see the newly generated comic
      if (activeTab === 'library') {
        await fetchComics();
      }
    } catch (error) {
      console.error('Error generating comic:', error);
      setError('Failed to generate comic. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen bg-black text-white flex">
      {/* Hamburger Menu Button - Mobile Only */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Menu size={20} className="text-white" />
        </button>
      )}

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-40
        w-64 bg-black border-r border-gray-800 flex flex-col h-full
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:w-64
      `}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-3 text-white hover:text-gray-300 transition-colors group"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                <img 
                  src="/white_logo_transparent.png" 
                  alt="LexAI Logo" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Koma
              </span>
            </button>
            
            {/* Close Button - Mobile Only */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <button
              onClick={() => handleTabChange('explore')}
              className={`w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-sm transition-colors ${
                activeTab === 'explore' 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Compass size={18} />
              <span>Explore</span>
            </button>
            
            <button
              onClick={() => handleTabChange('top')}
              className={`w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-sm transition-colors ${
                activeTab === 'top' 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <TrendingUp size={18} />
              <span>Top</span>
            </button>
            
            <button
              onClick={() => handleTabChange('likes')}
              className={`w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-sm transition-colors ${
                activeTab === 'likes' 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              } ${!user ? 'opacity-50' : ''}`}
            >
              <Heart size={18} />
              <span>Likes</span>
            </button>
            
            <button
              onClick={() => handleTabChange('library')}
              className={`w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-sm transition-colors ${
                activeTab === 'library' 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              } ${!user ? 'opacity-50' : ''}`}
            >
              <Library size={18} />
              <span>My Library</span>
            </button>
          </div>
        </nav>
        
        {/* Profile Section */}
        <div className="p-4 border-t border-gray-800">
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={`w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-sm transition-colors ${
                showProfileMenu
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <User size={18} />
              <span>{user ? user.email || 'Profile' : 'Not logged in'}</span>
            </button>
            
            {showProfileMenu && user && (
              <div className="absolute bottom-full left-0 w-full bg-gray-800 rounded-lg mb-2 py-2 shadow-lg border border-gray-700">
                <button 
                  onClick={() => {
                    setShowDeleteConfirm(true);
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-900/20 transition-colors text-red-400 hover:text-red-300"
                >
                  <Trash2 size={16} />
                  <span className="text-sm">Delete Account</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
                >
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        
        {/* Comics Grid - Removed background from image cards */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader className="animate-spin mx-auto mb-2" size={24} />
                <p className="text-gray-400">Loading comics...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <AlertCircle className="mx-auto mb-2 text-red-500" size={24} />
                <p className="text-red-400">{error}</p>
                <button 
                  onClick={fetchComics}
                  className="mt-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : comics.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-gray-400">
                  {activeTab === 'library' ? 'No comics in your library yet.' : 
                   activeTab === 'likes' ? 'No liked comics yet.' : 
                   'No comics available.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 pb-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
                {comics.map((comic) => (
                  <div key={comic._id} className="group relative hover:transform hover:scale-[1.02] transition-all duration-300">
                    <div className="relative cursor-pointer" onClick={() => setSelectedComic(comic)}>
                      {/* Image Container - No background, transparent */}
                      <div className="relative overflow-hidden">
                        <img
                          src={comic.image_url || '/placeholder-comic.jpg'}
                          alt={comic.prompt || 'Generated manga'}
                          className="transform scale-95 hover:scale-100 transition-transform duration-300"
                          style={{
                            width: '100%',
                            maxWidth: '640px',
                            height: 'auto',
                            aspectRatio: '640/420',
                            objectFit: 'contain',
                            backgroundColor: 'transparent'
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-comic.jpg';
                          }}
                        />
                        
                        {/* Like Count Overlay - Bottom Left */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                          <Heart 
                            size={14} 
                            className={`${comic.is_liked ? 'text-red-500 fill-red-500' : 'text-white'}`}
                          />
                          <span className="text-xs text-white font-medium">
                            {comic.likes?.toLocaleString() || '0'}
                          </span>
                        </div>
                        
                        {/* Like Button - Top Right */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent popup from opening
                              handleLike(comic._id);
                            }}
                            className="p-2 bg-black/60 hover:bg-black/80 rounded-full transition-all backdrop-blur-sm"
                            disabled={!user}
                          >
                            <Heart 
                              size={18} 
                              className={`${comic.is_liked ? 'text-red-500 fill-red-500' : 'text-white'} ${!user ? 'opacity-50' : ''}`} 
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Extra spacing at bottom for better scroll experience */}
              <div className="h-8"></div>
            </div>
          )}
        </div>
        
        {/* Manga Detail Popup - Background only shows here */}
        {selectedComic && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setSelectedComic(null)}>
            <div className=" backdrop-blur-md rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto border border-gray-600/30" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-white">Manga Details</h3>
                <button 
                  onClick={() => setSelectedComic(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mb-4">
                <img
                  src={selectedComic.image_url || '/placeholder-comic.jpg'}
                  alt={selectedComic.prompt || 'Generated manga'}
                  className="w-full rounded-lg"
                  style={{
                    maxWidth: '640px',
                    height: 'auto',
                    aspectRatio: '640/420',
                    objectFit: 'contain',
                    backgroundColor: '#0d0d0dff'
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-comic.jpg';
                  }}
                />
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-1">Prompt</h4>
                  <p className="text-white text-sm">{selectedComic.prompt || 'No prompt available'}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-300">{selectedComic.likes?.toLocaleString() || '0'} likes</span>
                  </div>
                  
                  {user && (
                    <button
                      onClick={() => {
                        handleLike(selectedComic._id);
                        setSelectedComic(null);
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                    >
                      <Heart 
                        size={14} 
                        className={selectedComic.is_liked ? 'text-red-500 fill-current' : 'text-white'} 
                      />
                      <span className="text-sm">{selectedComic.is_liked ? 'Unlike' : 'Like'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Account Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowDeleteConfirm(false)}>
            <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500/20 rounded-full">
                  <Trash2 size={20} className="text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-white">Delete Account</h3>
              </div>
              
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your comics and data.
              </p>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white rounded-md transition-colors flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      Delete Account
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Image Generation Bar - Fixed blur only on input elements */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center bg-gradient-to-t from-black/80 to-transparent">
          <div className="relative flex items-center gap-2 max-w-2xl w-full">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter prompt for image generation..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
                className="w-full pl-4 pr-4 py-3 bg-black/50 backdrop-blur-md border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-0 shadow-lg transition-colors"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={!searchText.trim() || loading || !user}
              className="p-3 bg-white hover:bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors shadow-lg backdrop-blur-md"
            >
              <Send size={20} className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};