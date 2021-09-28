import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { Wallet, TabLink, Navigation, navItems } from "components-ui";
import {
  AccountModal,
  useAccountModal,
  VoteDelegationModal,
  useVoteDelegationModal,
} from "components-ui/modals";
import {
  Layout,
  Box,
  Grid,
  Row,
  Col,
  LoadingSpinner,
  ContextMenu,
  ToggleMenu,
  Button,
} from "union-ui";
import useInactiveListener from "hooks/useInactiveListener";
import usePublicData from "hooks/usePublicData";
import useMemberCheck from "hooks/useMemberCheck";
import useIsMobile from "hooks/useIsMobile";
import { Avatar } from "./Avatar";
import { ClaimButton } from "./ClaimButton";

const contextMenuItems = [
  {
    label: "Docs",
    target: "_blank",
    href: "https://unionfinance.gitbook.io/docs/",
  },
  { label: "Blog", target: "_blank", href: "https://medium.com/union-finance" },
  {
    label: "Twitter",
    target: "_blank",
    href: "https://twitter.com/unionprotocol",
  },
  { label: "Discord", target: "_blank", href: "https://discord.gg/cZagzJ3p8G" },
  { label: "Github", target: "_blank", href: "https://github.com/unioncredit" },
];

export function Wrapper({ children, tabItems }) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { isOpen: isVoteDelegationOpen } = useVoteDelegationModal();
  const { isOpen: isAccountModalOpen, open: openAccountModal } =
    useAccountModal();
  const { account } = useWeb3React();

  const { name } = usePublicData(account);

  const tabItemLinks =
    tabItems?.length > 0
      ? tabItems.map((item) => ({ ...item, as: TabLink }))
      : [];

  const initialTab = tabItemLinks.findIndex(
    (item) => item.href === router.pathname
  );

  useInactiveListener();
  const { isLoading } = useMemberCheck();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <>
      <Layout>
        <Layout.Main>
          <Grid style={{ display: "flex", flexGrow: 1 }}>
            <Row style={{ width: "100%", margin: 0 }}>
              <Col>
                <Layout.Header align="center">
                  <Navigation />
                  <Box align="center">
                    <Box mr="8px">
                      <Wallet
                        onClick={openAccountModal}
                        name={name}
                        avatar={<Avatar address={account} />}
                        mr="8px"
                      />
                    </Box>
                    <ContextMenu
                      position="left"
                      items={contextMenuItems}
                      after={<ClaimButton size="small" label="Claim UNION" />}
                    />
                  </Box>
                </Layout.Header>
                <Box
                  fluid
                  align="center"
                  direction="vertical"
                  className="inner-wrapper"
                >
                  <Box
                    {...{
                      ...(isMobile
                        ? { justify: "space-between", fluid: true }
                        : {}),
                    }}
                  >
                    {isMobile && (
                      <ContextMenu
                        items={navItems.slice(1)}
                        button={(toggleOpen) => (
                          <Button
                            onClick={toggleOpen}
                            label="Menu"
                            variant="secondary"
                            icon="dropdown-arrow"
                            iconPosition="end"
                          />
                        )}
                      />
                    )}
                    <ToggleMenu
                      className="wrapper-toggle-menu"
                      items={tabItemLinks}
                      initialActive={initialTab}
                    />
                  </Box>
                  {children}
                </Box>
              </Col>
            </Row>
          </Grid>
          <Box mb="40px" />
        </Layout.Main>
      </Layout>
      {isAccountModalOpen && <AccountModal />}
      {isVoteDelegationOpen && <VoteDelegationModal />}
    </>
  );
}
